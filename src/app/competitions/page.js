import { personalBests } from '@/data/site';
import { seasons, score, seasonLabel, slug, total, ordinal } from '@/lib/results';
import Place from '../components/Place';
import SeasonPhotos from '../components/SeasonPhotos';

export const metadata = {
  title: 'Competitions',
  description: 'Season-by-season programs and competition results for Leah Neset and Artem Markelov, from 2020 to today.',
};

function Segment({ seg }) {
  return (
    <span className="seg">
      {score(seg)}
      {seg?.place ? <span className="seg-rank"> ({ordinal(seg.place)})</span> : null}
    </span>
  );
}

export default function Competitions() {
  return (
    <>
      <section className="page-hero">
        <div className="container comp-hero">
          <div className="comp-hero__text">
            <span className="eyebrow rise">Competitions</span>
            <h1 className="display rise rise-2">Results by season</h1>
            <p className="lead rise rise-3">Programs and scores from our first U.S. Championships in 2021 to the senior Grand Prix. New ISU results are added automatically.</p>
          </div>
          <div className="pb-list rise rise-3" aria-label="ISU personal bests">
            <span className="pb-list__label">ISU personal bests</span>
            {personalBests.map((p) => (
              <div className="pb-row" key={p.segment}>
                <span className="pb-row__segment">{p.segment}</span>
                <span className="pb-row__event">{p.event}</span>
                <span className="pb-row__score">{p.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="season-nav" aria-label="Seasons">
        <div className="container">
          <div className="season-nav__list">
            {seasons.map((s) => (
              <a key={s.season} href={`#${slug(s.season)}`} className="chip">
                {seasonLabel(s.season)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="seasons">
        {seasons.map((s) => (
          <section key={s.season} id={slug(s.season)} className="season">
            <div className="container">
              <div className="season__head">
                <h2 className="display">{seasonLabel(s.season)}</h2>
                <span className="season__tag">
                  {s.level}
                  {s.note ? ` · ${s.note}` : ''}
                </span>
              </div>

              <dl className="season__programs">
                <div>
                  <dt className="program__label">Rhythm Dance</dt>
                  <dd className="program__music">{s.rhythmDance || 'To be announced'}</dd>
                </div>
                <div>
                  <dt className="program__label">Free Dance</dt>
                  <dd className="program__music">{s.freeDance || 'To be announced'}</dd>
                </div>
              </dl>

              {s.results.length > 0 && (
                <table className="results-table">
                  <thead>
                    <tr>
                      <th scope="col">Place</th>
                      <th scope="col">Event</th>
                      <th scope="col" className="num">
                        RD
                      </th>
                      <th scope="col" className="num">
                        FD
                      </th>
                      <th scope="col" className="num">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.results.map((r) => (
                      <tr key={r.event}>
                        <td className="place-cell">
                          <Place place={r.place} />
                        </td>
                        <td className="event">{r.event}</td>
                        <td className="num" data-label="RD">
                          <Segment seg={r.rd} />
                        </td>
                        <td className="num" data-label="FD">
                          <Segment seg={r.fd} />
                        </td>
                        <td className="num total" data-label="Total">
                          {total(r)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {s.galleries?.length > 0 && <SeasonPhotos galleries={s.galleries} />}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
