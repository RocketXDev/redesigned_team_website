import { interviews, socials, videos } from '@/data/site';
import { seasonLabel } from '@/lib/results';
import PageHero from '../components/PageHero';
import VideoCard from '../components/VideoCard';
import { ExternalIcon } from '../components/Icons';

export const metadata = {
  title: 'Videos',
  description: 'Watch rhythm dances and free dances by Leah Neset and Artem Markelov from the Junior Grand Prix, World Juniors and more.',
};

export default function Videos() {
  return (
    <>
      <PageHero eyebrow="Videos" title={<>Programs on <em>ice</em></>}>
        Rhythm dances and free dances from every season, from our first U.S. Championships to the senior Grand Prix. Official ISU videos may not play in the United States — the link under each one opens it on YouTube.
        <div className="btn-row" style={{ marginTop: 20 }}>
          <a href={socials.youtube.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
            Our YouTube channel <ExternalIcon />
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          {videos.map((group) => (
            <div className="video-season" key={group.season}>
              <h2 className="display">
                {seasonLabel(group.season)} <em>season</em>
              </h2>
              <div className="grid-3">
                {group.items.map((v) => (
                  <VideoCard key={v.id} id={v.id} title={v.title} meta={v.segment} source={v.source} geo={v.geo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Off the ice</span>
            <h2 className="display">
              Interviews <em>&amp; features</em>
            </h2>
          </div>
          <div className="grid-3">
            {interviews.map((v) => (
              <VideoCard key={v.id} id={v.id} title={v.title} meta={v.segment} source={v.source} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
