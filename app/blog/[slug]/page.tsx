import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { marked } from 'marked'
import styles from '../blog.module.css'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { meta } = getPostBySlug(slug)
  return {
    title: `${meta.title} | Kamboj Electrical`,
    description: meta.description,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { meta, content } = getPostBySlug(slug)
  const htmlContent = marked(content)

  return (
    <div className={styles.postContainer}>
      <Link href="/blog" className={styles.backLink}>← Back to all posts</Link>

      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot}></span> {meta.date}
      </span>
      <h1 className={styles.postPageTitle}>{meta.title}</h1>

      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className={styles.ctaBox}>
        <p className={styles.ctaText}>Facing this issue at home? We're one call away.</p>
        <Link href="/register" className={styles.ctaButton}>Book a Service</Link>
      </div>
    </div>
  )
}