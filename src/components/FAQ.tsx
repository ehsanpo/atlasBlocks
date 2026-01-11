import { useState } from 'react'
import { cn } from "@/lib/utils"
import { ChevronRight } from 'lucide-react'

export interface FAQItem {
  id: number | string
  question: string
  answer: string
}

export interface FAQProps {
  /**
   * FAQ questions and answers
   */
  questions: FAQItem[]
  
  /**
   * Section background color
   */
  backgroundColor?: string
  
  /**
   * Alignment of the component
   * @default "default"
   */
  align?: "default" | "wide" | "full"
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Allow multiple items to be open at once
   * @default false
   */
  allowMultiple?: boolean
}

export function FAQ({
  questions = [],
  backgroundColor,
  align = "default",
  className,
  allowMultiple = false,
}: FAQProps) {
  const [openIds, setOpenIds] = useState<Set<number | string>>(new Set())

  const toggleItem = (id: number | string) => {
    const newOpenIds = new Set(openIds)
    if (newOpenIds.has(id)) {
      newOpenIds.delete(id)
    } else {
      if (!allowMultiple) {
        newOpenIds.clear()
      }
      newOpenIds.add(id)
    }
    setOpenIds(newOpenIds)
  }

  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-4xl mx-auto px-4",
        className
      )}
      style={{ backgroundColor }}
    >
      <div className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {questions.map((item) => {
          const isOpen = openIds.has(item.id)
          
          return (
            <div key={item.id} className="group overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between px-6 py-6 text-left text-lg font-semibold transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="flex-1 pr-4">{item.question}</span>
                <ChevronRight 
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-90"
                  )} 
                />
              </button>
              <div
                id={`faq-answer-${item.id}`}
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
                aria-hidden={!isOpen}
              >
                <div className="overflow-hidden">
                  <div 
                    className="px-6 pb-6 pt-0 text-muted-foreground prose prose-sm max-w-none dark:prose-invert leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

