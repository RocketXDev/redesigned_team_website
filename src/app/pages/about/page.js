import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <>
      <Nav/>
      <div className="main-wrapper">
        <div className='our-story-wrapper'>
          <img src='/main.jpeg'></img>
          <div className='story-text'>
            <div className='text-header'>Our Story</div>
            <div className='text-descr'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut imperdiet massa. Vivamus sit amet mauris sit amet eros suscipit egestas a sed magna. Nulla semper odio et magna fermentum pharetra. Pellentesque vel blandit erat. Praesent eu dolor finibus magna mollis ultricies interdum vehicula ligula. Sed ut felis turpis. Donec eu ligula ex. Integer vitae massa tempor, faucibus mi nec, lobortis quam. Fusce ultricies tortor condimentum sapien ultricies, sed commodo dui accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas a porta elit. Fusce commodo maximus purus ac consequat. Proin cursus eget ex eget laoreet. Nulla facilisi. Donec molestie laoreet lacus, quis volutpat odio vestibulum ut.</div>
          </div>
        </div>
        <div className="profile-info-wrapper">
          <div className='text-header'>Meet Leah Neset & Artem Markelov</div>
          <div className='profile-info-block-wrapper'>
            <div className='profile-info-block'>
                <div className='block-hero leah'>
                </div>
            </div>
            <div className='profile-info-block'>
                <div className='block-hero artem'>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}