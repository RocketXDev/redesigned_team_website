import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function Store() {
  return (
    <>
      <Nav/>
        <div className="main-wrapper">
            <div className='store-wrapper'>
                <div className='store-product'>
                    <Image alt='NM Hoodie' width={500} height={300} src='/public/merch_design.png' className='pr-img'></Image>
                    <div className='pr-name'>NM Hoodie</div>
                    <div className='pr-price'>$35</div>
                </div>
            </div>
        </div>
      <Footer/>
    </>
  )
}