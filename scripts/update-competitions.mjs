#!/usr/bin/env node
// Keeps src/data/competitions.json up to date from the ISU results service.
//
//   node scripts/update-competitions.mjs              # find new events on the ISU bio and add them
//   node scripts/update-competitions.mjs --dry-run    # show what would change, write nothing
//   node scripts/update-competitions.mjs --url https://results.isu.org/results/season2627/gpusa2026/
//                                                     # add/refresh one event from any ISU-format results page
//   node scripts/update-competitions.mjs --url <results url> --event "Nebelhorn Trophy 2026"
//                                                     # fill scores for an entry already on the site (matched by name)
//
// How it works:
//   1. Reads the team's ISU "Competition Results" page (every event + final placement).
//   2. Anything not yet in competitions.json (matched by `isuName`) is new.
//   3. For new ISU events it finds the event's results folder, reads the Rhythm Dance and
//      Free Dance segment pages and records score + segment placement.
//   4. Events the ISU doesn't host (e.g. U.S. Championships) are added with placement only;
//      fill in the scores by hand, or re-run with --url when a results page exists.
//   5. If a new season starts, it is created with program music from the ISU bio.
// Requires Node 18+ (built-in fetch). No npm dependencies.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = path.join(ROOT, 'src/data/competitions.json');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const argValue = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null);
const urlArg = argValue('--url');
const eventArg = argValue('--event');

// ---------- helpers ----------

async function get(url) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (team-website results updater)' } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const head = buf.subarray(0, 2048).toString('latin1');
    const charset = /charset=["']?utf-8/i.test(head) || /charset=["']?utf-8/i.test(res.headers.get('content-type') || '') ? 'utf-8' : 'latin1';
    return buf.toString(charset);
}

const decode = (s) => s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .trim();

const cells = (rowHtml) => [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => decode(m[1]));
const rows = (html) => [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) => m[1]);
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// Same event under slightly different names ("ISU Grand Prix Final 2023/24" vs
// "ISU Grand Prix of Figure Skating Final 2023/24"): same year and most words shared.
const STOP = new Set(['isu', 'of', 'the', 'and', 'gp', 'cs', 'jgp', 'series', 'challenger', 'figure', 'skating']);
function sameEvent(a, b) {
    const words = (x) => norm(x).split(' ').filter((w) => w && !STOP.has(w));
    const wa = words(a), wb = new Set(words(b));
    const years = (ws) => ws.filter((w) => /^20\d{2}$/.test(w)).join(',');
    if (!wa.length || years(wa) !== years([...wb])) return false;
    return wa.filter((w) => wb.has(w)).length / wa.length >= 0.75;
}

function seasonForDate(d) {
    const y = d.getUTCFullYear();
    return d.getUTCMonth() >= 6 ? `${y}-${y + 1}` : `${y - 1}-${y}`; // seasons run July–June
}

function parseIsuDate(text) {
    const m = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    return m ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])) : null;
}

// "ISU GP saatva Skate America 2026" -> "2026 Skate America (Grand Prix)"
function prettyName(isuName, category) {
    let name = isuName.trim();
    const year = (name.match(/\b(20\d{2})\b/) || [])[1] || '';
    if (/^National Championships/i.test(name)) {
        return `${year} U.S. Figure Skating Championships${/junior/i.test(category) ? ' (Junior)' : ''}`;
    }
    let suffix = '';
    name = name.replace(/^ISU\s+/i, '');
    if (/^GP\s+/i.test(name)) { name = name.replace(/^GP\s+/i, ''); suffix = ' (Grand Prix)'; }
    name = name.replace(/^CS\s+/i, 'Challenger Series ').replace(/^JGP\s+/i, 'Junior Grand Prix ');
    name = name.replace(/^(Challenger Series |Junior Grand Prix )?(?:[a-z][\w-]*\s+)+/, '$1'); // drop lowercase sponsor words
    name = name.replace(/\s*\b20\d{2}(\/\d{2})?\b\s*/g, ' ').replace(/^Grand Prix de France/, 'Grand Prix de France').trim();
    if (suffix && /Grand Prix/.test(name)) suffix = '';
    return `${year} ${name}${suffix}`.trim();
}

// ---------- ISU pages ----------

async function readCompetitionList(bioId) {
    const html = await get(`https://www.isuresults.com/bios/isufs_cr_${bioId}.htm`);
    const list = [];
    for (const r of rows(html)) {
        const c = cells(r).filter(Boolean);
        if (c.length >= 3 && /dance/i.test(c[1]) && /^\d+$/.test(c[2])) {
            list.push({ isuName: c[0], category: c[1], place: +c[2] });
        }
    }
    if (!list.length) throw new Error('No competitions found on the ISU competition results page; its layout may have changed.');
    return list;
}

async function readBio(bioId) {
    const html = await get(`https://results.isu.org/bios/isufs${bioId}.htm`);
    const links = [...html.matchAll(/href='[^']*\/events\/([a-z0-9]+)_(?:Junior)?IceDance\.htm'[^>]*>([^<]+)</gi)]
        .map((m) => ({ code: m[1], text: decode(m[2]) }));
    const music = {};
    for (const [key, label] of [['rhythmDance', 'Music Rhythm Dance'], ['freeDance', 'Music Free Skating / Free Dance']]) {
        const m = html.match(new RegExp(label.replace(/[/]/g, '\\/') + ' as of season (\\d{4})\\/(\\d{4})[\\s\\S]*?<\\/tr>\\s*<tr[^>]*>\\s*<td[^>]*>([\\s\\S]*?)<\\/td>', 'i'));
        if (m) {
            const pieces = [...new Set(decode(m[3]).split('\n').map((x) => x.trim()).filter(Boolean))];
            music[key] = { season: `${m[1]}-${m[2]}`, text: pieces.map((p) => {
                const [title, by] = p.split(/ by /);
                return by ? `"${title}", ${by}` : `"${title}"`;
            }).join('; ') };
        }
    }
    return { links, music };
}

async function findResultsFolder(code) {
    const year = +(code.match(/(20\d{2})/) || [])[1];
    if (!year) return null;
    const yy = (n) => String(n % 100).padStart(2, '0');
    for (const season of [`${yy(year)}${yy(year + 1)}`, `${yy(year - 1)}${yy(year)}`]) {
        const url = `https://results.isu.org/results/season${season}/${code}/`;
        try {
            const html = await get(url + 'index.htm');
            if (/SEG\d{3}\.htm/i.test(html)) return url;
        } catch { /* try next season */ }
    }
    return null;
}

// Reads an ISU-format results folder (index.htm + SEGxxx.htm) and returns this team's scores.
async function readEventResults(folderUrl, bioId) {
    const base = folderUrl.replace(/index\.htm$/i, '').replace(/\/?$/, '/');
    const index = await get(base + 'index.htm');
    const title = decode((index.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '');
    const date = parseIsuDate(decode(index));
    const segs = [...new Set([...index.matchAll(/href=["']?(SEG\d{3})\.htm/gi)].map((m) => m[1]))];
    const result = { title, date, rd: null, fd: null };
    for (const seg of segs) {
        const html = await get(`${base}${seg}.htm`);
        const segTitle = decode((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '');
        const evName = /^-/.test(segTitle) ? '' : segTitle.split(' - ')[0].trim();
        if (!result.title && evName) result.title = evName; // some older index pages have an empty <title>
        const key = /Ice Dance - Rhythm Dance/i.test(segTitle) ? 'rd' : /Ice Dance - Free Dance/i.test(segTitle) ? 'fd' : null;
        if (!key) continue;
        const row = rows(html).find((r) => r.includes(`isufs${bioId}.htm`) || /NESET/.test(r));
        if (!row) continue;
        // Columns: place, [Q at championships], name, nation, TSS, ... -> read relative to the name cell
        const raw = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
        const nameIdx = raw.findIndex((x) => x.includes(`isufs${bioId}.htm`) || /NESET/.test(x));
        const c = raw.map(decode);
        const place = parseInt(c[0], 10);
        const score = parseFloat(c[nameIdx + 2]);
        if (!Number.isNaN(score)) result[key] = { score, place: Number.isNaN(place) ? null : place };
    }
    return result;
}

// ---------- data file ----------

function ensureSeason(data, season, music) {
    let s = data.seasons.find((x) => x.season === season);
    if (!s) {
        s = { season, level: 'Senior', rhythmDance: '', freeDance: '', results: [] };
        data.seasons.push(s);
        data.seasons.sort((a, b) => b.season.localeCompare(a.season));
        console.log(`+ new season ${season}`);
    }
    for (const key of ['rhythmDance', 'freeDance']) {
        if (!s[key] && music[key] && music[key].season === season) {
            s[key] = music[key].text;
            console.log(`  ${season} ${key} from ISU bio: ${music[key].text}`);
        }
    }
    return s;
}

function insertResult(season, entry) {
    // results are newest first; dated entries go before older dated ones, otherwise at the top
    let i = 0;
    if (entry.date) {
        while (i < season.results.length && season.results[i].date && season.results[i].date > entry.date) i++;
    }
    season.results.splice(i, 0, entry);
}

function describe(e) {
    const seg = (s) => (s ? `${s.score.toFixed(2)} (#${s.place})` : '—');
    return `${e.event}: place ${e.place}, RD ${seg(e.rd)}, FD ${seg(e.fd)}, total ${e.total ?? '—'}`;
}

async function save(data) {
    const json = JSON.stringify(data, null, 2) + '\n';
    await writeFile(DATA_FILE, json);
}

// ---------- main ----------

async function main() {
    const data = JSON.parse(await readFile(DATA_FILE, 'utf8'));
    const bioId = data.isuBioId;
    const all = data.seasons.flatMap((s) => s.results);
    const changes = [];

    if (urlArg) {
        const ev = await readEventResults(urlArg, bioId);
        if (!ev.rd && !ev.fd) throw new Error(`Team not found in the ice dance results at ${urlArg}`);
        if (!ev.title && !eventArg) throw new Error(`Could not read the event name at ${urlArg}; re-run with --event "<name>"`);
        const isuName = ev.title.replace(/\s+-\s+.*$/, '').trim();
        let entry = eventArg
            ? all.find((r) => norm(r.isuName || '').includes(norm(eventArg)) || norm(r.event).includes(norm(eventArg)))
            : all.find((r) => r.isuName && norm(r.isuName) === norm(isuName))
              || all.find((r) => r.isuName && sameEvent(r.isuName, isuName));
        if (eventArg && !entry) throw new Error(`No entry matching --event "${eventArg}" in competitions.json`);
        if (!entry) {
            const season = ensureSeason(data, seasonForDate(ev.date || new Date()), {});
            entry = { place: ev.fd?.place ?? ev.rd?.place, event: prettyName(isuName, ''), isuName };
            insertResult(season, entry);
        }
        // only overwrite segments that were actually found on the page
        if (ev.rd) entry.rd = ev.rd;
        if (ev.fd) entry.fd = ev.fd;
        entry.resultsUrl = urlArg;
        if (ev.date) entry.date = ev.date.toISOString().slice(0, 10);
        if (entry.rd && entry.fd) entry.total = Math.round((entry.rd.score + entry.fd.score) * 100) / 100;
        changes.push(describe(entry));
    } else {
        const known = new Set(all.filter((r) => r.isuName).map((r) => norm(r.isuName)));
        const list = await readCompetitionList(bioId);
        const fresh = list.filter((c) => !known.has(norm(c.isuName)));
        if (!fresh.length) {
            console.log('Competitions are up to date.');
            return;
        }
        const bio = await readBio(bioId);
        for (const c of fresh) {
            const entry = { place: c.place, event: prettyName(c.isuName, c.category), isuName: c.isuName, rd: null, fd: null, total: null };
            let date = null;
            const link = bio.links.find((l) => norm(l.text).startsWith(norm(c.isuName)) || norm(c.isuName).startsWith(norm(l.text)));
            const folder = link ? await findResultsFolder(link.code) : null;
            if (folder) {
                const ev = await readEventResults(folder, bioId);
                date = ev.date;
                Object.assign(entry, { rd: ev.rd, fd: ev.fd, resultsUrl: folder });
                if (ev.rd && ev.fd) entry.total = Math.round((ev.rd.score + ev.fd.score) * 100) / 100;
            } else {
                console.log(`! no ISU results page found for "${c.isuName}"; adding placement only`);
            }
            if (date) entry.date = date.toISOString().slice(0, 10);
            const season = ensureSeason(data, seasonForDate(date || new Date()), bio.music);
            insertResult(season, entry);
            changes.push(describe(entry));
        }
    }

    console.log((DRY_RUN ? 'Would add/update:\n' : 'Added/updated:\n') + changes.map((c) => '  ' + c).join('\n'));
    if (process.env.GITHUB_STEP_SUMMARY) {
        await writeFile(process.env.GITHUB_STEP_SUMMARY, '### Competition results updated\n\n' + changes.map((c) => '- ' + c).join('\n') + '\n', { flag: 'a' });
    }
    if (!DRY_RUN) await save(data);
}

main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
});
