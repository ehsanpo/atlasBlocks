import { useState } from "react"
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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <section
      className={cn(
        "py-12 md:py-20 lg:py-24",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-4xl mx-auto px-4",
        className
      )}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-6" />
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">{successMessage}</p>
            <Button 
              variant="outline" 
              className="mt-8"
              onClick={() => setIsSubmitted(false)}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message" 
                placeholder="How can we help you?" 
                className="min-h-[150px] resize-none"
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {submitText}
                </div>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
