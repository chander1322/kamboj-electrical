import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

marked.setOptions({
  breaks: true,    
})
const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  title: string
  description: string
  date: string
  slug: string
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory)
  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)
    return data as PostMeta
  })
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return { meta: data as PostMeta, content }
}