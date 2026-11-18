import Link from 'next/link';
import { navLinks, site, socials } from '@/data/site';
import { SocialIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Link href="/" className="brand">
              <span className="brand__badge" aria-hidden="true">
                <span className="brand__mark" />
              </span>
              <span className="brand__name">
                Leah Neset <span className="brand__amp">&amp;</span> Artem Markelov
              </span>
            </Link>
            <p className="site-footer__tagline">{site.tagline}</p>
            <div className="socials">
              {[socials.teamInstagram, socials.youtube, socials.facebook].map((s) => (
                <a key={s.url} href={s.url} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </div>
          <nav className="site-footer__nav" aria-label="Footer">
            <Link href="/">Home</Link>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>U.S. Ice Dance · {site.location}</span>
        </div>
      </div>
    </footer>
  );
}
