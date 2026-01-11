import { useState } from 'react'
import { ArticleList } from '../ArticleList'
import { DocPage } from '../DocPage'

const initialArticles = [
  {
    id: 1,
    title: "Building Scalable Web Applications",
    excerpt: "Learn the best practices for building web applications that can handle millions of users with ease and efficiency.",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop"
  },
  {
    id: 2,
    title: "The Future of AI in Development",
    excerpt: "Artificial Intelligence is transforming how we write code. Discover how you can leverage AI to speed up your workflow.",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
  },
  {
    id: 3,
    title: "Mastering Tailwind CSS Patterns",
    excerpt: "Deep dive into advanced Tailwind CSS techniques to create beautiful, maintainable, and responsive user interfaces.",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=450&fit=crop"
  },
  {
    id: 4,
    title: "React Server Components Explained",
    excerpt: "Everything you need to know about React Server Components and how they change the way we build React applications.",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
  }
]

const componentCode = `import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"

export interface Article {
  id: number | string
  title: string
  excerpt: string
  link: string
  thumbnail?: string
  thumbnailAlt?: string
}

export interface ArticleListProps {
  articles: Article[]
  newsToShow?: 2 | 3 | 4 | -1
  backgroundColor?: string
  align?: "default" | "wide" | "full"
  className?: string
  readMoreText?: string
  excerptLength?: number
}

export function ArticleList({
  articles = [],
  newsToShow = 3,
  backgroundColor,
  align = "default",
  className,
  readMoreText = "Read more",
  excerptLength = 30,
}: ArticleListProps) {
  const displayedArticles = newsToShow === -1 
    ? articles 
    : articles.slice(0, newsToShow)

  const truncateExcerpt = (text: string, maxWords: number): string => {
    const words = text.split(' ')
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
  }

  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
      style={{ backgroundColor }}
    >
      <ul
        className={cn(
          "grid gap-6 md:gap-8",
          "grid-cols-1",
          displayedArticles.length >= 2 && "md:grid-cols-2",
          displayedArticles.length >= 3 && "lg:grid-cols-3",
          displayedArticles.length === 4 && "lg:grid-cols-4"
        )}
      >
        {displayedArticles.map((article) => (
          <li
            key={article.id}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
          >
            {article.thumbnail && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.thumbnailAlt || article.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6 text-left">
              <a
                href={article.link}
                className="mb-3 block text-xl font-semibold leading-tight tracking-tight text-foreground transition-colors hover:text-primary"
              >
                <h3>{article.title}</h3>
              </a>
              <div className="mb-4 flex-1 text-sm text-muted-foreground">
                {truncateExcerpt(article.excerpt, excerptLength)}
              </div>
              <Button
                variant="link"
                className="h-auto p-0 text-primary group-hover:text-primary/80 justify-start"
                asChild
              >
                <a href={article.link}>
                  {readMoreText}
                  <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}`

const usageCode = `import { ArticleList } from "@/components/ArticleList"

const articles = [
  {
    id: 1,
    title: "Modern Web Gems",
    excerpt: "Exploring the hidden treasures of the modern web stack.",
    link: "/posts/modern-web-gems",
    thumbnail: "/images/blog-1.jpg"
  }
]

export default function Page() {
  return (
    <ArticleList 
      articles={articles}
      newsToShow={3}
      align="wide"
      readMoreText="Explore"
    />
  )
}`

const apiProps = [
  { name: "articles", type: "Article[]", description: "Array of article objects to display." },
  { name: "newsToShow", type: "2 | 3 | 4 | -1", defaultValue: "3", description: "Number of articles to show. -1 shows all." },
  { name: "backgroundColor", type: "string", description: "Background color for the entire section." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Horizontal alignment and width of the container." },
  { name: "readMoreText", type: "string", defaultValue: "'Read more'", description: "Text for the action button." },
  { name: "excerptLength", type: "number", defaultValue: "30", description: "Maximum word count for excerpts." },
  { name: "className", type: "string", description: "Additional CSS classes." },
]

export function ArticleListPreview() {
  const [data, setData] = useState({
    articles: initialArticles,
    newsToShow: 3 as const,
    align: "default" as const,
    readMoreText: "Read more",
    excerptLength: 30
  })

  return (
    <DocPage
      name="Article List"
      description="A clean grid of articles with images, excerpts, and action buttons."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Show</label>
            <select 
              value={data.newsToShow} 
              onChange={(e) => setData({ ...data, newsToShow: Number(e.target.value) as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value={2}>2 Articles</option>
              <option value={3}>3 Articles</option>
              <option value={4}>4 Articles</option>
              <option value={-1}>All Articles</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Width</label>
            <select 
              value={data.align} 
              onChange={(e) => setData({ ...data, align: e.target.value as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="default">Default</option>
              <option value="wide">Wide</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Button Text</label>
            <input 
              type="text" 
              value={data.readMoreText} 
              onChange={(e) => setData({ ...data, readMoreText: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-24"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Excerpt Words</label>
            <input 
              type="number" 
              value={data.excerptLength} 
              onChange={(e) => setData({ ...data, excerptLength: Number(e.target.value) })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-16"
            />
          </div>
        </div>
      }
    >
      <ArticleList 
        articles={data.articles}
        newsToShow={data.newsToShow}
        align={data.align}
        readMoreText={data.readMoreText}
        excerptLength={data.excerptLength}
      />
    </DocPage>
  )
}
