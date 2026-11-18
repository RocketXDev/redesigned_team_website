import { Inter, Manrope } from 'next/font/google';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { site } from '@/data/site';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · U.S. Ice Dance`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} · U.S. Ice Dance`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: '/main_2.jpeg', width: 1280, height: 960, alt: 'Leah Neset and Artem Markelov with their medals' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · U.S. Ice Dance`,
    description: site.description,
    images: ['/main_2.jpeg'],
  },
};

export const viewport = {
  themeColor: '#f7f5f0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
