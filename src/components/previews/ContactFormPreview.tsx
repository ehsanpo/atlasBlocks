import { useState } from 'react'
import { ContactForm } from '../ContactForm'
import { DocPage } from '../DocPage'

const componentCode = `import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Send, CheckCircle2 } from "lucide-react"

export interface ContactFormProps {
  title?: string
  description?: string
  successMessage?: string
  submitText?: string
  align?: "default" | "wide" | "full"
  backgroundColor?: string
  className?: string
}

export function ContactForm({
  title = "Get in Touch",
  description = "Have a question or want to work together? Send us a message.",
  successMessage = "Thank you! Your message has been sent successfully.",
  submitText = "Send Message",
  align = "default",
  backgroundColor,
  className,
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <section className={cn("py-12 md:py-24", align === "wide" && "max-w-7xl mx-auto px-4", align === "full" && "w-full", align === "default" && "max-w-4xl mx-auto px-4", className)}>
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Form Implementation... */}
      </div>
    </section>
  )
}`

const usageCode = `import { ContactForm } from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <ContactForm 
      title="Contact Our Team"
      description="We'll get back to you within 24 hours."
      submitText="Reach Out"
    />
  )
}`

const apiProps = [
  { name: "title", type: "string", defaultValue: "Get in Touch", description: "Main heading for the contact section." },
  { name: "description", type: "string", defaultValue: "...", description: "Supporting text for the heading." },
  { name: "successMessage", type: "string", defaultValue: "...", description: "Message shown after successful form submission." },
  { name: "submitText", type: "string", defaultValue: "Send Message", description: "Text for the submit button." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment and width." },
]

export function ContactFormPreview() {
  const [data, setData] = useState({
    title: "Get in Touch",
    description: "Have a question or want to work together? Send us a message.",
    submitText: "Send Message",
    align: "default" as const
  })

  return (
    <DocPage
      name="Contact Form"
      description="A professional contact section with form validation and success feedback."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
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
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Submit Text</label>
            <input 
              type="text" 
              value={data.submitText} 
              onChange={(e) => setData({ ...data, submitText: e.target.value })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none w-32"
            />
          </div>
        </div>
      }
    >
      <div className="w-full">
        <ContactForm 
          {...data}
        />
      </div>
    </DocPage>
  )
}
