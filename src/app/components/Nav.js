'use client'
import '../components.css';
import Link from 'next/link';
import {useState} from 'react';

export default function Nav() {

    const [hamburgerToggled, setHamburgerToggled] = useState(false);

    if(hamburgerToggled) {
        return(
        <ul className="nav-links mobile">
            <div onClick={()=>{setHamburgerToggled(false)}} className='hamburger-mobile close'>
                <span></span>
                <span></span>
            </div>
            <div className='links-wrapper'>
                <Link href="../pages/temporary">About us</Link>
                <Link href="../pages/temporary">Training</Link>
                <Link href="../pages/temporary">Competitions</Link>
                <Link href="../pages/temporary">Videos</Link>
                <Link href="../pages/temporary">Social Media</Link>
                <Link href="../pages/temporary">Sponsors</Link>
                <Link href="../pages/store">Our Store</Link>
            </div>
        </ul>)
    }

    return (
        <div>
            <div className="nav-wrapper">
                <div className="nav-title">
                    <Link href="/">Leah Neset & Artem Markelov</Link>
                </div>
                <div onClick={() => setHamburgerToggled(true)} className='hamburger-mobile'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className="nav-links">
                    <Link href="../pages/temporary">About us</Link>
                    <Link href="../pages/temporary">Training</Link>
                    <Link href="../pages/temporary">Competitions</Link>
                    <Link href="../pages/temporary">Videos</Link>
                    <Link href="../pages/temporary">Social Media</Link>
                    <Link href="../pages/temporary">Sponsors</Link>
                    <Link href="../pages/store">Our Store</Link>
                </ul>
            </div>
        </div>
    )
}