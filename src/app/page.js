import Nav from './components/Nav';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Nav/>
      <div className="main-wrapper">
        <div className='main-text-wrapper'>
          <div className='title'>Welcome to the official website of</div>
          <div className='brand'><span>Neset & Markelov</span></div>
          <div className='subtitle'>Here you can find the latest updates about our team and achievements, as well as access photos, videos, and information about our sponsors.</div>
          <div className='text-btn'>Learn More</div>
        </div>
      </div>
      <Footer/>
    </>
  )
}