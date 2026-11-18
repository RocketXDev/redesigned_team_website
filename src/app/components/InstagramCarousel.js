'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SocialIcon, ArrowIcon } from './Icons';

const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function Track({ posts, profile }) {
  const track = useRef(null);
  const root = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  const step = useCallback((dir) => {
    const el = track.current;
    if (!el) return;
    const slide = el.querySelector('.ig-slide');
    const amount = slide ? slide.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    if (dir > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
      el.scrollTo({ left: 0, behavior: 'smooth' }); // loop back to the start
    } else {
      el.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
  }, []);

  // only autoplay while the carousel is on screen
  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // gentle autoplay; pauses on hover/focus/touch, when off screen, when the tab is hidden,
  // and when the user prefers reduced motion
  useEffect(() => {
    if (paused || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      if (!document.hidden) step(1);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, visible, step]);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, posts]);

  return (
    <div
      ref={root}
      className="ig"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="ig-track" ref={track} role="list" aria-label={`Latest posts from ${profile.handle}`}>
        {posts.map((p) => (
          <a key={p.id} href={p.url} className="ig-slide" role="listitem" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.caption ? p.caption.slice(0, 120) : `Instagram post by ${profile.handle}`} loading="lazy" />
            {(p.isVideo || p.isAlbum) && <span className="ig-slide__badge">{p.isVideo ? 'Video' : 'Album'}</span>}
            <span className="ig-slide__overlay">
              {p.caption && <span className="ig-slide__caption">{p.caption}</span>}
              <span className="ig-slide__date">{fmtDate(p.date)}</span>
            </span>
          </a>
        ))}
      </div>
      <div className="ig-controls">
        <a href={profile.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
          Follow {profile.handle} <ArrowIcon />
        </a>
        <div className="ig-buttons">
          <button type="button" className="ig-btn" onClick={() => step(-1)} disabled={atStart} aria-label="Previous posts">
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
              <ArrowIcon />
            </span>
          </button>
          <button type="button" className="ig-btn" onClick={() => step(1)} aria-label={atEnd ? 'Back to first post' : 'Next posts'}>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function Fallback({ profile, name }) {
  return (
    <a href={profile.url} target="_blank" rel="noopener noreferrer" className="card ig-fallback">
      <span className="link-card__icon">
        <SocialIcon name="Instagram" />
      </span>
      <span>
        <span className="link-card__title">{profile.handle}</span>
        <span className="link-card__meta" style={{ display: 'block' }}>
          {name === 'Team' ? 'See our latest posts on Instagram' : `See ${name}’s latest posts on Instagram`}
        </span>
      </span>
      <span className="link-arrow">
        Open Instagram <ArrowIcon />
      </span>
    </a>
  );
}

// feeds: [{ key, name, profile: {handle,url}, posts: [...] | null }]
export default function InstagramCarousel({ feeds }) {
  const [active, setActive] = useState(feeds[0].key);
  const feed = feeds.find((f) => f.key === active) || feeds[0];

  return (
    <div className="ig-wrap">
      {feeds.length > 1 && (
        <div className="ig-tabs" role="tablist" aria-label="Instagram accounts">
          {feeds.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={f.key === active}
              className={`chip${f.key === active ? ' chip--active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}
      <div role="tabpanel">
        {feed.posts && feed.posts.length ? <Track key={feed.key} posts={feed.posts} profile={feed.profile} /> : <Fallback profile={feed.profile} name={feed.name} />}
      </div>
    </div>
  );
}
