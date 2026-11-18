import { socials } from '@/data/site';
import { getInstagramPosts } from '@/lib/instagram';
import InstagramCarousel from '../components/InstagramCarousel';
import { SocialIcon } from '../components/Icons';

export const metadata = {
  title: 'Social Media',
  description: 'Follow Leah Neset and Artem Markelov on Instagram, YouTube and Facebook.',
};

export const revalidate = 86400; // pull fresh Instagram posts once a day

const channels = [
  { ...socials.teamInstagram, who: 'Team' },
  { ...socials.leahInstagram, who: 'Leah' },
  { ...socials.artemInstagram, who: 'Artem' },
  { ...socials.youtube, who: 'YouTube' },
  { ...socials.facebook, who: 'Facebook' },
];

export default async function Social() {
  const [team, leah, artem] = await Promise.all([getInstagramPosts('team'), getInstagramPosts('leah'), getInstagramPosts('artem')]);

  const feeds = [
    { key: 'team', name: 'Team', profile: socials.teamInstagram, posts: team },
    { key: 'leah', name: 'Leah', profile: socials.leahInstagram, posts: leah },
    { key: 'artem', name: 'Artem', profile: socials.artemInstagram, posts: artem },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow rise">Social media</span>
          <h1 className="display rise rise-2">Follow along</h1>
          <p className="lead rise rise-3">Training days, competition trips and life off the ice.</p>
          <ul className="channel-list rise rise-4" aria-label="Our channels">
            {channels.map((c) => (
              <li key={c.url}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="channel">
                  <span className="channel__icon">
                    <SocialIcon name={c.label} />
                  </span>
                  <span className="channel__text">
                    <span className="channel__who">{c.who}</span>
                    <span className="channel__handle">{c.label === 'Instagram' ? c.handle : c.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Latest on Instagram</span>
            <h2 className="display">Recent posts</h2>
          </div>
          <InstagramCarousel feeds={feeds} />
        </div>
      </section>
    </>
  );
}
