import { cn } from "@/lib/utils"

export interface FooterLink {
  label: string
  url: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  logo?: React.ReactNode
  description?: string
  sections: FooterSection[]
  copyright?: string
  align?: "default" | "wide" | "full"
  backgroundColor?: string
  gradientBackground?: boolean
  className?: string
}

export function Footer({
  logo = (
    <div className="flex items-center gap-2">
      <img src="/logo.png" alt="Atlas Logo" className="h-6 w-6 object-contain" />
      <span className="text-xl font-bold tracking-tight">Atlas Blocks</span>
    </div>
  ),
  description = "Building the future of the web with powerful components and state-of-the-art design systems.",
  sections = [],
  copyright = `© ${new Date().getFullYear()} Atlas Blocks Inc. All rights reserved.`,
  align = "default",
  backgroundColor,
  gradientBackground = false,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "py-16 md:py-24 border-t border-border relative overflow-hidden",
        gradientBackground && "bg-gradient-to-br from-primary/10 via-background to-accent/5",
        align === "wide" && "max-w-7xl mx-auto px-8",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-8",
        className
      )}
      style={{ backgroundColor }}
    >
      {/* Abstract background shapes if gradient is on */}
      {gradientBackground && (
        <>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
        </>
      )}

      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Brand Section */}
        <div className="lg:col-span-4">
          <div className="mb-8">{logo}</div>
          <p className="font-mono max-w-xs text-muted-foreground leading-relaxed mb-8 text-lg">
            {description}
          </p>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.url} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-muted-foreground font-medium">
          {copyright}
        </p>
      </div>
    </footer>
  )
}
