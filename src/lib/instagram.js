// Instagram feed via the official Instagram API (Instagram Login).
//
// Setup (once per account — team, Leah, Artem):
//   1. The Instagram account must be a Professional account (Creator or Business). Free, in the IG app settings.
//   2. Create an app at developers.facebook.com → add the "Instagram" product → "API setup with Instagram login".
//   3. Add the account under "Generate access tokens", log in, copy the long-lived token.
//   4. Put it in the hosting env vars (Vercel → Settings → Environment Variables):
//        INSTAGRAM_TOKEN_TEAM, INSTAGRAM_TOKEN_LEAH, INSTAGRAM_TOKEN_ARTEM
//
// Posts are re-fetched at most once a day (REVALIDATE). Long-lived tokens last 60 days; every daily
// fetch also asks Instagram to extend the token, so it keeps working as long as the site is visited.
// If a token is missing or fails, the page falls back to a link to that profile.

const REVALIDATE = 60 * 60 * 24; // 24 hours
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

const TOKENS = {
  team: process.env.INSTAGRAM_TOKEN_TEAM,
  leah: process.env.INSTAGRAM_TOKEN_LEAH,
  artem: process.env.INSTAGRAM_TOKEN_ARTEM,
};

async function refreshToken(token) {
  try {
    await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`, {
      next: { revalidate: REVALIDATE },
    });
  } catch {
    // best effort — the current token keeps working until it expires
  }
}

export async function getInstagramPosts(account, limit = 12) {
  const token = TOKENS[account];
  if (!token) return null;

  try {
    const res = await fetch(`https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${limit}&access_token=${encodeURIComponent(token)}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) {
      console.error(`Instagram (${account}): HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    refreshToken(token);
    return (json.data || [])
      .map((p) => ({
        id: p.id,
        image: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        isVideo: p.media_type === 'VIDEO',
        isAlbum: p.media_type === 'CAROUSEL_ALBUM',
        caption: (p.caption || '').trim(),
        url: p.permalink,
        date: p.timestamp,
      }))
      .filter((p) => p.image);
  } catch (err) {
    console.error(`Instagram (${account}):`, err.message);
    return null;
  }
}
