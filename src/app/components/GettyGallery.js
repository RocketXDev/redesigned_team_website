'use client';

import { useEffect, useRef } from 'react';

// Loads Getty's widget script once and resolves when `gie.widgets` is ready.
let gettyReady = null;
function loadGetty() {
  if (gettyReady) return gettyReady;
  gettyReady = new Promise((resolve, reject) => {
    const w = window;
    // Getty's documented queue stub; widgets.js reads it when it loads
    w.gie =
      w.gie ||
      function (c) {
        (w.gie.q = w.gie.q || []).push(c);
      };
    const s = document.createElement('script');
    s.src = 'https://embed-cdn.gettyimages.com/widgets.js';
    s.async = true;
    s.onerror = () => reject(new Error('Getty widgets failed to load'));
    s.onload = () => {
      // widgets may attach a tick after onload
      let tries = 0;
      const check = () => {
        if (w.gie && w.gie.widgets) resolve(w.gie);
        else if (tries++ < 50) setTimeout(check, 100);
        else reject(new Error('Getty widgets unavailable'));
      };
      check();
    };
    document.body.appendChild(s);
  });
  return gettyReady;
}

// Getty Images editorial embed.
// Getty's script replaces the placeholder link with its own markup, so React only renders an
// empty container and the placeholder is created by hand — otherwise React would crash when
// it later tries to update or remove a node Getty has already replaced.
export default function GettyGallery({ gallery }) {
  const host = useRef(null);
  const { gettyId, sig, width, height, items, caption } = gallery;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;

    el.replaceChildren();
    const a = document.createElement('a');
    a.id = gettyId;
    a.className = 'gie-slideshow';
    a.href = `https://www.gettyimages.com/detail/${items.split(',')[0]}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'View photos on Getty Images';
    el.appendChild(a);

    loadGetty()
      .then((gie) => {
        if (cancelled) return;
        gie.widgets.load({ id: gettyId, sig, w: `${width}px`, h: `${height}px`, items, caption: !!caption, tld: 'com', is360: false });
      })
      .catch(() => {
        // keep the plain link as a fallback
      });

    return () => {
      cancelled = true;
      el.replaceChildren();
    };
  }, [gettyId, sig, width, height, items, caption]);

  return <div className="getty-frame" ref={host} />;
}
