import Link from 'next/link';
import { socials, sponsors } from '@/data/site';
import PageHero from '../components/PageHero';
import { ArrowIcon, ExternalIcon } from '../components/Icons';

export const metadata = {
  title: 'Sponsors',
  description: 'The partners who support Leah Neset and Artem Markelov, and how to become one.',
};

export default function Sponsors() {
  return (
    <>
      <PageHero eyebrow="Sponsors" title={<>Thank you to our <em>partners</em></>}>
        Elite ice dance takes thousands of hours on the ice every year. These partners help make it possible.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {sponsors.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="card link-card">
                <span className="eyebrow">Sponsor</span>
                <span className="link-card__title" style={{ fontSize: '2rem' }}>
                  {s.name}
                </span>
                <span className="link-card__meta">{s.text}</span>
                <span className="link-arrow">
                  {s.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} <ExternalIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="callout">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Partner with us</span>
              <h2 className="display">
                Become a <em>sponsor</em>
              </h2>
              <p className="lead">
                We are U.S. senior ice dancers competing on the ISU Grand Prix and Challenger Series, with a growing audience across Instagram and YouTube. If your brand would like to support our road to the Olympic Games, we would love to talk.
              </p>
            </div>
            <div className="btn-row">
              <a href={socials.teamInstagram.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                Message us <ArrowIcon />
              </a>
              <Link href="/donate" className="btn btn--ghost">
                Support as a fan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
