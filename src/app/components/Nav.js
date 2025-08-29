import '../components.css';
import Link from 'next/link';

export default function Nav() {
    return (
        <div>
            <div className="nav-wrapper">
                <div className="nav-title">
                    <Link href="/">Leah Neset & Artem Markelov</Link>
                </div>
                <ul className="nav-links">
                    <Link href="../pages/about">About us</Link>
                    <li>Training</li>
                    <li>Competitions</li>
                    <li>Videos</li>
                    <li>Social Media</li>
                    <li>Sponsors</li>
                </ul>
            </div>
        </div>
    )
}