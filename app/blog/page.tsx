import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import styles from './blog.module.css'

export const metadata = {
  title: 'Blog — Electrical Tips & Guides | Kamboj Electrical',
  description: 'Practical electrical tips, safety guides, and home wiring advice from Kamboj Electrical.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot}></span> Electrical Tips & Guides
        </span>
        <h1 className={styles.pageTitle}>Stuff every homeowner should know</h1>
        <p className={styles.pageSubtitle}>
          Practical electrical advice, safety tips, and real stories from the field — no jargon, just things that actually help.
        </p>
      </div>

      <div className={styles.postGrid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
            <span className={styles.postDate}>{post.date}</span>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDesc}>{post.description}</p>
            <span className={styles.readMore}>
              Read more <span className={styles.readMoreArrow}>→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}