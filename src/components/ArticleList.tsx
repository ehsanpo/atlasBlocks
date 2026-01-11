import { cn } from "@/lib/utils"
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
  /**
   * Articles to display
   */
  articles: Article[]
  
  /**
   * Number of articles to show (2, 3, 4, or -1 for all)
   * @default 3
   */
  newsToShow?: 2 | 3 | 4 | -1
  
  /**
   * Background color for the section
   */
  backgroundColor?: string
  
  /**
   * Alignment of the block (wide, full, or default)
   * @default "default"
   */
  align?: "default" | "wide" | "full"
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Text for the "Read more" link
   * @default "Read more"
   */
  readMoreText?: string
  
  /**
   * Maximum length of excerpt in words
   * @default 30
   */
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
}

