import Image from "next/image";
import Link from "next/link";
import { PiGithubLogo, PiArrowUpRight } from "react-icons/pi";
import styles from "./landing.module.css";

export default function Footer() {
    return <footer className={styles.footer}><div><Link href="/" className={styles.brand}><Image src="/TaskPilot-favicon.png" alt="" width={28} height={28} />Team Tasks</Link><p>A little less admin. A little more progress.</p></div><nav aria-label="Footer navigation"><Link href="#features">Features</Link><Link href="#faq">FAQ</Link><Link href="https://github.com/manav437" target="_blank" rel="noopener noreferrer"><PiGithubLogo aria-hidden="true" />GitHub<PiArrowUpRight aria-hidden="true" /></Link></nav><div className={styles.copyright}>© {new Date().getFullYear()} Team Tasks</div></footer>;
}
