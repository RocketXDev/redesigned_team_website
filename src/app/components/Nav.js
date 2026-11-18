'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks, site, socials } from '@/data/site';
import { SocialIcon } from './Icons';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // only re-render when crossing the threshold, at most once per frame
  useEffect(() => {
    let frame = 0;
    let last = null;
    const check = () => {
      frame = 0;
      const next = window.scrollY > 8;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${site.name}, home`}>
          <span className="brand__mark" aria-hidden="true">NM</span>
          <span className="brand__name">{site.shortName}</span>
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link" aria-current={isActive(l.href) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`nav-mobile${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav className="nav-mobile__links" aria-label="Mobile">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} tabIndex={open ? 0 : -1}>
            Home
          </Link>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined} tabIndex={open ? 0 : -1}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-mobile__foot">
          <span>{site.tagline}</span>
          <div className="socials">
            {[socials.teamInstagram, socials.youtube, socials.facebook].map((s) => (
              <a key={s.url} href={s.url} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={s.label} tabIndex={open ? 0 : -1}>
                <SocialIcon name={s.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
