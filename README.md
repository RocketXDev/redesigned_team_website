# nesetmarkelov.com

Official website of U.S. ice dancers Leah Neset & Artem Markelov. Next.js (App Router).

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build
npm run update-results # pull new competition results from the ISU
```

## Where the content lives

| What | File |
| --- | --- |
| Bios, story, timeline, team, sponsors, store products, videos, social links | `src/data/site.js` |
| Seasons, programs and competition results | `src/data/competitions.json` |
| Donation amounts, Venmo username | `donate` in `src/data/site.js` |
| Styles | `src/app/globals.css` |

Pages: `/`, `/about`, `/competitions`, `/videos`, `/social`, `/sponsors`, `/donate`, `/store`.
Old `/pages/...` URLs redirect to the new ones (`next.config.mjs`).

## Competition results update themselves

`scripts/update-competitions.mjs` reads the team's ISU bio, finds competitions that aren't in
`competitions.json` yet, and adds them with rhythm dance / free dance scores and placements.
A new season is created automatically with program music from the ISU bio.

- `.github/workflows/update-competitions.yml` runs it every day and commits any changes; the push redeploys the site.
- Events the ISU doesn't host (U.S. Championships, some Lake Placid editions) are added with the placement only.
  Fill in scores by hand in `competitions.json`, or point the script at a results page:

```bash
node scripts/update-competitions.mjs --url https://results.isu.org/results/season2627/gpusa2026/
node scripts/update-competitions.mjs --url <results url> --event "Nebelhorn Trophy 2026"   # match an existing entry
node scripts/update-competitions.mjs --dry-run                                              # preview only
```

## Instagram feed

The home page (team feed) and `/social` (team, Leah, Artem tabs) show a carousel of the latest
Instagram posts, refreshed once a day. Until a token is set, each tab shows a link to the profile instead.

1. Make each Instagram account a **Professional** account (Creator or Business) in the Instagram app.
2. At [developers.facebook.com](https://developers.facebook.com/) create an app → add **Instagram** →
   **API setup with Instagram login** → **Generate access tokens**, log in with the account, copy the token.
3. Add the tokens as environment variables on the host (Vercel → Project → Settings → Environment Variables), then redeploy:

```
INSTAGRAM_TOKEN_TEAM=...
INSTAGRAM_TOKEN_LEAH=...
INSTAGRAM_TOKEN_ARTEM=...
```

Tokens last 60 days and are extended automatically each time the feed refreshes.

## Donations (card, Apple Pay, Google Pay, Cash App Pay)

The donation box on `/donate` sends donors to Square checkout for the amount they pick — the same
Square account as the store. Until it's set up, the button says "Message us to donate" (Venmo still works).

1. [developer.squareup.com](https://developer.squareup.com/apps) → sign in with the store's Square account → **Create an app**.
2. Open the app → **Credentials** → switch to **Production** → copy the **Access token**.
3. **Locations** (left menu) → copy the **Location ID** of the business location.
4. On the host (Vercel → Settings → Environment Variables) add:

```
SQUARE_ACCESS_TOKEN=...
SQUARE_LOCATION_ID=...
```

Then redeploy. To test first, use the app's **Sandbox** token and location and also set `SQUARE_ENVIRONMENT=sandbox`.

No-code alternative: in Square Dashboard → Online → Payment links, create a link of type **Donation**
(donor types the amount) and paste it into `squareLink` in `src/data/site.js`.

Square's standard online card fee applies (about 2.9% + 30¢). Donors get a Square receipt and land on `/donate/thank-you`.
