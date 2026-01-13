import { cn } from "@/lib/utils"
import { Twitter, Linkedin, Github } from "lucide-react"

export interface TeamMember {
  id: number | string
  name: string
  role: string
  image: string
  bio?: string
  twitterUrl?: string
  linkedinUrl?: string
  githubUrl?: string
}

export interface TeamProps {
  headline?: string
  subheadline?: string
  members: TeamMember[]
  columns?: 2 | 3 | 4
  align?: "default" | "wide" | "full"
  className?: string
}

export function Team({
  headline = "Meet Our Experts",
  subheadline = "The talented people behind our premium products.",
  members = [],
  columns = 3,
  align = "default",
  className,
}: TeamProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-20 lg:py-24",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
    >
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">{headline}</h2>
        <p className="text-lg text-muted-foreground">{subheadline}</p>
      </div>

      <div
        className={cn(
          "grid gap-8 md:gap-10",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {members.map((member) => (
          <div key={member.id} className="group relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-muted mb-6 shadow-sm transition-all duration-500 group-hover:shadow-2xl">
              <img 
                src={member.image} 
                alt={member.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-center space-x-3 p-3 bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">
                  {member.twitterUrl && <a href={member.twitterUrl} className="text-white hover:text-primary-foreground transition-colors"><Twitter className="h-5 w-5" /></a>}
                  {member.linkedinUrl && <a href={member.linkedinUrl} className="text-white hover:text-primary-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>}
                  {member.githubUrl && <a href={member.githubUrl} className="text-white hover:text-primary-foreground transition-colors"><Github className="h-5 w-5" /></a>}
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">{member.role}</p>
              {member.bio && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 italic">{member.bio}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
