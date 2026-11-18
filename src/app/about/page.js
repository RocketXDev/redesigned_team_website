import Image from 'next/image';
import Link from 'next/link';
import { athletes, story, team, timeline } from '@/data/site';
import PageHero from '../components/PageHero';
import { ArrowIcon, SocialIcon } from '../components/Icons';

export const metadata = {
  title: 'About',
  description: 'The story of U.S. ice dancers Leah Neset and Artem Markelov — from Minot and Volzhsky to World Junior Champions.',
};

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>One team, <em>two journeys</em></>}>
        Leah grew up skating in North Dakota. Artem grew up skating in Russia. Since 2020 they have skated as one — and won the world junior title together.
      </PageHero>

      {/* STORY */}
      <section className="section">
        <div className="container split">
          <div className="split__media" style={{ aspectRatio: '4 / 5' }}>
            <Image src="/main_2.jpeg" alt="Leah and Artem holding their medals and flowers" fill sizes="(min-width: 900px) 50vw, 100vw" style={{ objectPosition: '50% 30%' }} />
          </div>
          <div className="split__body">
            <span className="eyebrow">Our story</span>
            <h2 className="display">
              Skate with purpose, <em>trust the process</em>
            </h2>
            <div className="prose">
              {story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="section-head">
            <span className="eyebrow">Milestones</span>
            <h2 className="display">
              The road <em>so far</em>
            </h2>
            <p className="lead">From a tryout in 2020 to a world title and the senior Grand Prix.</p>
            <Link href="/competitions" className="link-arrow" style={{ alignSelf: 'flex-start' }}>
              Every result <ArrowIcon />
            </Link>
          </div>
          <ol className="timeline">
            {timeline.map((t) => (
              <li className="timeline__item" key={t.title}>
                <div className="timeline__year">{t.year}</div>
                <div className="timeline__title">{t.title}</div>
                <p className="timeline__text">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ATHLETES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The skaters</span>
            <h2 className="display">
              Meet Leah <em>&amp;</em> Artem
            </h2>
          </div>
          <div className="grid-2">
            {athletes.map((a) => (
              <article className="athlete" key={a.key} id={a.key}>
                <div className="athlete__photo">
                  <Image src={a.photo} alt={a.photoAlt} fill sizes="(min-width: 768px) 50vw, 100vw" />
                  <span className="athlete__caption">Where it began</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <h3 className="display">{a.name}</h3>
                  <a href={a.instagram.url} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${a.name} on Instagram`}>
                    <SocialIcon name="Instagram" />
                  </a>
                </div>
                <dl className="facts">
                  {a.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="prose">
                  {a.bio.map((p) => (
                    <p key={p.slice(0, 24)} className="muted">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container split" style={{ alignItems: 'start' }}>
          <div className="section-head">
            <span className="eyebrow">Behind the scenes</span>
            <h2 className="display">
              The team <em>behind the team</em>
            </h2>
            <p className="lead">Training full time at the World Arena Ice Hall in Colorado Springs.</p>
          </div>
          <dl className="team-list">
            {team.map((t) => (
              <div key={t.role}>
                <dt>{t.role}</dt>
                <dd>{t.names}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
