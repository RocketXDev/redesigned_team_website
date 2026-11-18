'use client';

import { useState } from 'react';
import { ArrowIcon, ExternalIcon } from './Icons';

function venmoUrl(user, amount, note) {
  const p = new URLSearchParams({ txn: 'pay', recipients: user, note });
  if (amount) p.set('amount', String(amount));
  return `https://venmo.com/?${p}`;
}

// cardMode: 'api'  → Square checkout for the exact amount (server creates the link)
//           'link' → open a Square donation link where the donor types the amount
//           'none' → card donations not set up; ask people to message us
export default function DonateBox({ config, cardMode, contactUrl }) {
  const { amounts, defaultAmount, minAmount, maxAmount, venmo, squareLink, description } = config;
  const [selected, setSelected] = useState(defaultAmount);
  const [custom, setCustom] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '' });

  const customValue = Number.parseFloat(custom);
  const amount = custom !== '' ? (customValue > 0 ? Math.round(customValue * 100) / 100 : null) : selected;
  const valid = amount != null && amount >= minAmount && amount <= maxAmount;
  const label = amount ? `$${amount % 1 ? amount.toFixed(2) : amount.toLocaleString('en-US')}` : '';

  async function payByCard() {
    if (!valid) {
      setStatus({ loading: false, error: `Please enter an amount between $${minAmount} and $${maxAmount.toLocaleString('en-US')}.` });
      return;
    }
    setStatus({ loading: true, error: '' });
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Could not start checkout.');
      window.location.assign(data.url);
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  }

  return (
    <div className="donate-box">
      <div className="donate-box__head">
        <h2 className="display" style={{ fontSize: '1.4rem' }}>
          Make a donation
        </h2>
        <p className="muted">Choose an amount — every gift helps.</p>
      </div>

      {cardMode !== 'link' && (
        <>
          <div className="amounts" role="radiogroup" aria-label="Donation amount">
            {amounts.map((a) => (
              <button
                key={a}
                type="button"
                role="radio"
                aria-checked={custom === '' && selected === a}
                className={`amount${custom === '' && selected === a ? ' amount--active' : ''}`}
                onClick={() => {
                  setSelected(a);
                  setCustom('');
                }}
              >
                ${a}
              </button>
            ))}
          </div>

          <label className="custom-amount">
            <span>Other amount</span>
            <span className="custom-amount__field">
              <span aria-hidden="true">$</span>
              <input type="number" inputMode="decimal" min={minAmount} max={maxAmount} step="1" placeholder="Enter amount" value={custom} onChange={(e) => setCustom(e.target.value)} />
            </span>
          </label>
        </>
      )}

      <div className="donate-box__actions">
        {cardMode === 'api' && (
          <button type="button" className="btn btn--primary btn--block" onClick={payByCard} disabled={status.loading}>
            {status.loading ? 'Opening secure checkout…' : `Donate ${label} by card`}
            {!status.loading && <ArrowIcon />}
          </button>
        )}
        {cardMode === 'link' && (
          <a href={squareLink} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--block">
            Donate by card <ExternalIcon />
          </a>
        )}
        {cardMode === 'none' && (
          <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--block">
            Message us to donate <ExternalIcon />
          </a>
        )}
        {venmo && (
          <a href={venmoUrl(venmo, cardMode !== 'link' && valid ? amount : null, description)} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--block">
            {cardMode !== 'link' && label ? `Pay ${label} with Venmo` : 'Pay with Venmo'} <ExternalIcon />
          </a>
        )}
      </div>

      {status.error && (
        <p className="donate-box__error" role="alert">
          {status.error}
        </p>
      )}

      <p className="donate-box__fine">
        {cardMode === 'none'
          ? 'Online card donations are coming soon — in the meantime you can give with Venmo or send us a message.'
          : 'Secure checkout by Square. Pay with any credit or debit card, Apple Pay, Google Pay or Cash App Pay.'}
      </p>
    </div>
  );
}
