import Image from 'next/image';
import Link from 'next/link';
import { highlights, products, site, socials, sponsors, story, videos } from '@/data/site';
import { seasons, score, seasonLabel, total } from '@/lib/results';
import { getInstagramPosts } from '@/lib/instagram';
import Place from './components/Place';
import VideoCard from './components/VideoCard';
import InstagramCarousel from './components/InstagramCarousel';
import { ArrowIcon, ExternalIcon, MedalIcon, SkateIcon } from './components/Icons';

export const revalidate = 86400; // re-fetch Instagram posts daily

export default async function Home() {
  const current = seasons[0];
  const latest = current.results.slice(0, 4);
  const featuredVideos = videos[0].items.slice(0, 3);
  const teamPosts = await getInstagramPosts('team', 12);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__media">
            <Image src="/main_3.png" alt="Leah and Artem wrapped in the American flag" fill priority sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
          <div className="hero__content">
            <span className="eyebrow rise">U.S. Ice Dance · {site.location}</span>
            <h1 className="display rise rise-2">
              Leah Neset <em>&amp;</em>
              <br />
              Artem Markelov
            </h1>
            <p className="hero__tagline rise rise-3">{site.tagline}</p>
            <p className="lead rise rise-3">
              U.S. senior ice dance team training in Colorado Springs and competing on the ISU Grand Prix — on the road to the Olympic Games.
            </p>
            <div className="btn-row rise rise-4">
              <Link href="/competitions" className="btn btn--primary">
                Results <ArrowIcon />
              </Link>
              <Link href="/about" className="btn btn--ghost">
                Our story
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <ul className="achievements" aria-label="Career highlights" style={{ listStyle: 'none', marginTop: 'clamp(24px, 4vw, 40px)' }}>
            {highlights.map((h) => (
              <li className="achievement" key={h.title}>
                <span className={`achievement__medal${h.medal ? '' : ' achievement__medal--plain'}`}>{h.medal ? <MedalIcon /> : <SkateIcon />}</span>
                <span>
                  <span className="achievement__title" style={{ display: 'block' }}>
                    {h.title}
                  </span>
                  <span className="achievement__detail">{h.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CURRENT SEASON */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Now competing</span>
              <h2 className="display">
                The {seasonLabel(current.season)} <em>season</em>
              </h2>
            </div>
            <Link href="/competitions" className="link-arrow">
              All results <ArrowIcon />
            </Link>
          </div>
          <div className="season-panel">
            <div>
              <div className="program">
                <span className="program__label">Rhythm Dance</span>
                <span className="program__music">{current.rhythmDance || 'To be announced'}</span>
              </div>
              <div className="program">
                <span className="program__label">Free Dance</span>
                <span className="program__music">{current.freeDance || 'To be announced'}</span>
              </div>
            </div>
            <ol className="result-list" aria-label="Latest results">
              {latest.map((r) => (
                <li className="result-item" key={r.event}>
                  <Place place={r.place} />
                  <div>
                    <div className="result-item__event">{r.event}</div>
                    <div className="result-item__detail">
                      RD {score(r.rd)} · FD {score(r.fd)}
                    </div>
                  </div>
                  <div className="result-item__score">{total(r)}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container split">
          <div className="split__media">
            <Image src="/main.JPEG" alt="Leah and Artem performing a dance spin at the Kinoshita Group Cup" fill sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
          <div className="split__body">
            <span className="eyebrow">Our story</span>
            <h2 className="display">
              From two continents to <em>one team</em>
            </h2>
            <div className="prose">
              <p>{story[0]}</p>
            </div>
            <Link href="/about" className="link-arrow">
              Meet Leah &amp; Artem <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">On Instagram</span>
              <h2 className="display">
                Follow the <em>journey</em>
              </h2>
            </div>
            <Link href="/social" className="link-arrow">
              All our socials <ArrowIcon />
            </Link>
          </div>
          <InstagramCarousel feeds={[{ key: 'team', name: 'Team', profile: socials.teamInstagram, posts: teamPosts }]} />
        </div>
      </section>

      {/* VIDEOS */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Watch</span>
              <h2 className="display">
                Programs on <em>ice</em>
              </h2>
            </div>
            <Link href="/videos" className="link-arrow">
              All videos <ArrowIcon />
            </Link>
          </div>
          <div className="grid-3">
            {featuredVideos.map((v) => (
              <VideoCard key={v.id} id={v.id} title={v.title} meta={`${seasonLabel(videos[0].season)} · ${v.segment}`} source={v.source} geo={v.geo} />
            ))}
          </div>
        </div>
      </section>

      {/* STORE */}
      <section className="section">
        <div className="container split split--reverse">
          <div className="split__media" style={{ background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #ece6da 75%)' }}>
            <Image src={products[0].image} alt="Black NM hoodie with gold Skate with Purpose logo" fill sizes="(min-width: 900px) 50vw, 100vw" style={{ objectFit: 'contain', padding: '32px' }} />
          </div>
          <div className="split__body">
            <span className="eyebrow">Team store</span>
            <h2 className="display">
              Skate with <em>purpose</em>
            </h2>
            <p className="lead">Hoodies, pins and keychains with our “Skate with purpose · Trust the process” logo. Every order helps cover training and competition costs.</p>
            <div className="btn-row">
              <Link href="/store" className="btn btn--primary">
                Shop the store <ArrowIcon />
              </Link>
              <Link href="/donate" className="btn btn--ghost">
                Support us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">With thanks to</span>
            <h2 className="display">
              Our <em>sponsors</em>
            </h2>
          </div>
          <div className="grid-3">
            {sponsors.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="card link-card">
                <span className="link-card__title">{s.name}</span>
                <span className="link-card__meta">{s.text}</span>
                <span className="link-arrow">
                  Visit <ExternalIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
