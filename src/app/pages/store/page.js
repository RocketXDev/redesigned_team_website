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
                    <Image alt='NM Hoodie' width={500} height={300} src='/merch_design.png' className='pr-img'></Image>
                    <div className='pr-name'>NM Hoodie</div>
                    <div className='pr-price'>$35.00 USD</div>
                </div>
                <div className='store-product'>
                    <Image alt='NM Keychains' width={300} height={280} src='/pins_logo.png' className='pr-img'></Image>
                    <div className='pr-name'>NM Keychain</div>
                    <div className='pr-price'>$8.00 USD</div>
                </div>
                <div className='store-product'>
                    <Image alt='NM Pins' width={300} height={280} src='/pins_logo.png' className='pr-img'></Image>
                    <div className='pr-name'>NM Pin</div>
                    <div className='pr-price'>$6.00 USD</div>
                </div>
            </div>
        </div>
      <Footer/>
    </>
  )
}