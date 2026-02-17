import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function Temporary() {
  return (
    <>
      <Nav/>
      <div className="main-wrapper">
        <div className="temp-placeholder">This page is currently under development.<br></br> Please come back later!</div>
      </div>
      <Footer/>
    </>
  )
}