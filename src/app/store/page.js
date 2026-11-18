import Image from 'next/image';
import { products } from '@/data/site';
import PageHero from '../components/PageHero';
import { ExternalIcon } from '../components/Icons';

export const metadata = {
  title: 'Store',
  description: 'Official Neset & Markelov merch — hoodies, pins and keychains with the Skate with Purpose logo.',
};

export default function Store() {
  return (
    <>
      <PageHero eyebrow="Team store" title={<>Skate with <em>purpose</em></>}>
        Official merch with our “Skate with purpose · Trust the process” logo. Every order helps cover our training and competition costs.
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {products.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="card product">
                <div className="product__media">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="product__body">
                  <div className="product__row">
                    <span className="product__name">{p.name}</span>
                    <span className="product__price">{p.price}</span>
                  </div>
                  <span className="muted">{p.note}</span>
                  <span className="btn btn--primary">
                    Order <ExternalIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
