import styles from '../home.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <span>⚡</span>
        <span className={styles.footerLogoText}>Kamboj<span className={styles.footerLogoAccent}>Electrical</span></span>
      </div>
      <div className={styles.footerCopy}>© 2026 Kamboj Electrical Services. All rights reserved. Punjab, India.</div>
      <div className={styles.footerLinks}>
        <Link href="/login" className={styles.footerLink}>Login</Link>
        <Link href="/register" className={styles.footerLink}>Register</Link>
      </div>
    </footer>
  )
}