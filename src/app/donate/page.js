import Link from 'next/link';
import { donate, socials } from '@/data/site';
import PageHero from '../components/PageHero';
import DonateBox from '../components/DonateBox';
import { ArrowIcon } from '../components/Icons';

export const metadata = {
  title: 'Support',
  description: 'Donate to support Leah Neset and Artem Markelov on their road to the Olympic Games.',
};

const costs = [
  { title: 'Ice time & coaching', text: 'Daily on-ice sessions with our coach and choreographers in Colorado Springs.' },
  { title: 'Competition travel', text: 'Flights, hotels and entry fees for Grand Prix and Challenger events around the world.' },
  { title: 'Programs & costumes', text: 'New choreography, music editing and costumes every season.' },
];

const otherWays = [
  { title: 'Shop the team store', text: 'Hoodies, pins and keychains with our logo.', href: '/store', cta: 'Visit the store' },
  { title: 'Become a sponsor', text: 'Partner with us as a brand or business.', href: '/sponsors', cta: 'Sponsorship' },
  { title: 'Follow along', text: 'Cheer us on and share our journey.', href: socials.teamInstagram.url, cta: 'Instagram', external: true },
];

export default function Donate() {
  // Square checkout for the exact amount when API keys are set; otherwise a Square donation link, if any.
  const cardMode = process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID ? 'api' : donate.squareLink ? 'link' : 'none';

  return (
    <>
      <PageHero eyebrow="Support us" title="Be part of the journey">
        Elite ice dance is one of the most demanding — and expensive — sports to train. Every contribution brings us closer to representing the United States at the Olympic Winter Games.
      </PageHero>

      <section className="section">
        <div className="container donate-layout">
          <DonateBox config={donate} cardMode={cardMode} contactUrl={socials.teamInstagram.url} />

          <div className="donate-info">
            <span className="eyebrow">Where it goes</span>
            <div>
              <div className="split-bar" aria-hidden="true">
                <span />
                <span />
              </div>
              <div className="split-legend">
                <span>
                  <span className="dot" />
                  <b>90%</b> skating expenses &amp; coaching
                </span>
                <span>
                  <span className="dot dot--cream" />
                  <b>10%</b> to charity
                </span>
              </div>
            </div>
            <ul className="cost-list">
              {costs.map((c) => (
                <li key={c.title}>
                  <span className="cost-list__title">{c.title}</span>
                  <span className="muted">{c.text}</span>
                </li>
              ))}
            </ul>
            <p className="donate-thanks">Thank you — we could not do this without you!</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">More ways to help</span>
            <h2 className="display">Other ways to support</h2>
          </div>
          <div className="grid-3">
            {otherWays.map((w) => {
              const inner = (
                <>
                  <span className="link-card__title">{w.title}</span>
                  <span className="link-card__meta">{w.text}</span>
                  <span className="link-arrow">
                    {w.cta} <ArrowIcon />
                  </span>
                </>
              );
              return w.external ? (
                <a key={w.title} href={w.href} target="_blank" rel="noopener noreferrer" className="card link-card">
                  {inner}
                </a>
              ) : (
                <Link key={w.title} href={w.href} className="card link-card">
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
