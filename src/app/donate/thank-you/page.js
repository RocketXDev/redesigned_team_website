import Link from 'next/link';
import PageHero from '../../components/PageHero';
import { ArrowIcon } from '../../components/Icons';

export const metadata = {
  title: 'Thank you',
  description: 'Thank you for supporting Leah Neset and Artem Markelov.',
  robots: { index: false },
};

export default function ThankYou() {
  return (
    <>
      <PageHero eyebrow="Thank you" title="Thank you for your support!">
        Your donation helps cover our ice time, coaching and travel to competitions. Square will email you a receipt.
      </PageHero>
      <section className="section">
        <div className="container btn-row">
          <Link href="/competitions" className="btn btn--primary">
            Follow our results <ArrowIcon />
          </Link>
          <Link href="/" className="btn btn--ghost">
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
