import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <>
      <Nav/>
      <div className="main-wrapper">
        <div className="profile-info-wrapper">
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
      <Footer/>
    </>
  )
}