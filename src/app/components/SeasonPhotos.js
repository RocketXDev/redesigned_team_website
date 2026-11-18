'use client';

import { useState } from 'react';
import GettyGallery from './GettyGallery';

// Getty embeds are heavy, so they only load once the visitor opens "Photos".
export default function SeasonPhotos({ galleries }) {
  const [opened, setOpened] = useState(false);

  return (
    <details className="season__photos" onToggle={(e) => e.currentTarget.open && setOpened(true)}>
      <summary>
        Photos <span className="muted">({galleries.length} {galleries.length === 1 ? 'gallery' : 'galleries'})</span>
      </summary>
      {opened && (
        <div className="season__gallery">
          {galleries.map((g) => (
            <div className="gallery-item" key={g.gettyId}>
              <h4>{g.title}</h4>
              <GettyGallery gallery={g} />
            </div>
          ))}
        </div>
      )}
    </details>
  );
}
