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