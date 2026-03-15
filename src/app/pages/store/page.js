'use client'
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Store() {
  return (
    <>
      <Nav/>
        <div className="main-wrapper">
            <div className='store-wrapper'>
                <div className='store-product'>
                    <Image alt='NM Hoodie' width={500} height={300} src='/merch_design.png' className='pr-img'></Image>
                    <div className='pr-name'>NM Hoodie</div>
                    <div className='pr-price'>$40.00 USD</div>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSd9UzgIyPMst0uqA4h1nfFslhVnPTO2gcch5C6yk-HAnnLPPA/viewform?usp=header"><div className="pr-order">Order</div></a>
                </div>
                <div className='store-product'>
                    <Image alt='NM Keychains' width={330} height={330} src='/keychain.png' className='pr-img'></Image>
                    <div className='pr-name'>NM Keychain</div>
                    <div className='pr-price'>$8.00 USD</div>
                    <div className="pr-order"><a href="#">Out of Stock</a></div>
                </div>
                <div className='store-product'>
                    <Image alt='NM Pins' width={330} height={330} src='/pin.png' className='pr-img pins'></Image>
                    <div className='pr-name'>NM Pin</div>
                    <div className='pr-price'>$6.00 USD</div>
                    <div className="pr-order"><a href="#">Out of Stock</a></div>
                </div>
            </div>
        </div>
      <Footer/>
    </>
  )
}