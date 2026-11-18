import { randomUUID } from 'node:crypto';
import { donate, site } from '@/data/site';

// Creates a Square payment link for the chosen donation amount and returns its URL.
// Needs SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID in the environment (see README).
// Set SQUARE_ENVIRONMENT=sandbox to test with Square's sandbox instead of real payments.
const SQUARE_VERSION = '2026-09-16';

export async function POST(request) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!token || !locationId) {
    return Response.json({ error: 'Card donations are not set up yet.' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const dollars = Number(body?.amount);
  if (!Number.isFinite(dollars) || dollars < donate.minAmount || dollars > donate.maxAmount) {
    return Response.json({ error: `Please enter an amount between $${donate.minAmount} and $${donate.maxAmount.toLocaleString('en-US')}.` }, { status: 400 });
  }

  const origin = request.headers.get('origin') || site.url;
  const base = process.env.SQUARE_ENVIRONMENT === 'sandbox' ? 'https://connect.squareupsandbox.com' : 'https://connect.squareup.com';

  const res = await fetch(`${base}/v2/online-checkout/payment-links`, {
    method: 'POST',
    headers: {
      'Square-Version': SQUARE_VERSION,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idempotency_key: randomUUID(),
      quick_pay: {
        name: 'Donation — Neset & Markelov',
        price_money: { amount: Math.round(dollars * 100), currency: 'USD' },
        location_id: locationId,
      },
      checkout_options: {
        redirect_url: `${origin}/donate/thank-you`,
        ask_for_shipping_address: false,
      },
      payment_note: donate.description,
    }),
  });

  const data = await res.json().catch(() => ({}));
  const url = data?.payment_link?.url || data?.payment_link?.long_url;
  if (!res.ok || !url) {
    console.error('Square payment link error:', data?.errors?.map((e) => e.detail || e.code).join('; ') || res.status);
    return Response.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 });
  }
  return Response.json({ url });
}
