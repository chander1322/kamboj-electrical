'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../home.module.css'

export default function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const name = localStorage.getItem('userName')
    if (name) setUser({ name })
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    setUser(null)
    router.push('/login')
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <Link href="/" className={styles.navLogo} style={{ textDecoration: 'none' }}>
        <div className={styles.navLogoIcon}>⚡</div>
        <span className={styles.navLogoText}>Kamboj<span className={styles.navLogoAccent}>Electrical</span></span>
      </Link>

      <div className={styles.navLinks}>
        {['Services', 'About', 'Testimonials', 'FAQ'].map(item => (
          <a key={item} href={`/#${item.toLowerCase()}`} className={styles.navLink}>{item}</a>
        ))}
        <Link href="/blog" className={styles.navLink}>Blog</Link>
      </div>

      <div className={styles.navActions}>
        {user ? (
          <>
            <span className={styles.navWelcome}>Welcome, <span className={styles.navWelcomeName}>{user.name}</span></span>
            <button onClick={handleLogout} className={styles.navLogoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.navLoginBtn}>Login</Link>
            <Link href="/register" className={styles.navRegisterBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}