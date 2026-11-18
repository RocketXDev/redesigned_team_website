'use client';

import { useState } from 'react';
import { PlayIcon } from './Icons';

// Shows a lightweight thumbnail and only loads the YouTube player when clicked.
export default function VideoCard({ id, title, meta, source, geo }) {
  const [playing, setPlaying] = useState(false);
  const label = `${title} — ${meta}`;

  return (
    <article className="video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <button type="button" className="video-play" onClick={() => setPlaying(true)} aria-label={`Play ${label}`}>
              <span className="video-play__icon">
                <PlayIcon />
              </span>
            </button>
          </>
        )}
      </div>
      <div>
        <div className="video-card__meta">{meta}</div>
        <h3 className="video-card__title">{title}</h3>
        {(source || geo) && (
          <p className="video-card__source">
            {source && <>via {source}</>}
            {source && geo && ' · '}
            {geo && (
              <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
                May be unavailable in the U.S.
              </a>
            )}
          </p>
        )}
      </div>
    </article>
  );
}
