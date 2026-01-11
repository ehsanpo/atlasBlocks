import { useState } from 'react'
import { FAQ } from '../FAQ'
import { DocPage } from '../DocPage'

const initialQuestions = [
  {
    id: 1,
    question: "What is this component library?",
    answer: "This is a collection of high-quality, reusable components built with React, Tailwind CSS, and Shadcn UI principles. It's designed to be fast, accessible, and easy to customize."
  },
  {
    id: 2,
    question: "How do I install the components?",
    answer: "You can install them via our CLI or manually copy-paste the source code into your project. Each component is self-contained and easy to integrate."
  },
  {
    id: 3,
    question: "Is it compatible with Next.js?",
    answer: "Yes! All components are fully compatible with Next.js, including both the App Router and Pages Router. They are primarily client-side components but work seamlessly in any React environment."
  },
  {
    id: 4,
    question: "Can I use it for commercial projects?",
    answer: "Absolutely. The library is released under the MIT license, meaning you can use it for both personal and commercial projects without any restrictions."
  }
]

const componentCode = `import { useState } from 'react'
import { cn } from "@/lib/utils"
import { ChevronRight } from 'lucide-react'

export interface FAQItem {
  id: number | string
  question: string
  answer: string
}

export interface FAQProps {
  questions: FAQItem[]
  backgroundColor?: string
  align?: "default" | "wide" | "full"
  className?: string
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
                aria-controls={\`faq-answer-\${item.id}\`}
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
                id={\`faq-answer-\${item.id}\`}
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
}`

const usageCode = `import { FAQ } from "@/components/FAQ"

const questions = [
  { id: 1, question: "How safe is my data?", answer: "We use end-to-end encryption." }
]

export default function FAQPage() {
  return (
    <FAQ questions={questions} allowMultiple={true} />
  )
}`

const apiProps = [
  { name: "questions", type: "FAQItem[]", description: "Array of question and answer objects." },
  { name: "allowMultiple", type: "boolean", defaultValue: "false", description: "Whether multiple items can be expanded simultaneously." },
  { name: "backgroundColor", type: "string", description: "Background color for the section." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Width and alignment of the FAQ container." },
]

export function FAQPreview() {
  const [data, setData] = useState({
    questions: initialQuestions,
    allowMultiple: false,
    align: "default" as const
  })

  return (
    <DocPage
      name="FAQ"
      description="An interactive accordion section for frequently asked questions."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex items-center gap-6">
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
            <input 
              type="checkbox" 
              id="allowMultiple"
              checked={data.allowMultiple} 
              onChange={(e) => setData({ ...data, allowMultiple: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="allowMultiple" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Allow Multiple</label>
          </div>
        </div>
      }
    >
      <FAQ 
        questions={data.questions}
        allowMultiple={data.allowMultiple}
        align={data.align}
      />
    </DocPage>
  )
}
