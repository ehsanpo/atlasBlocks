import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

export interface NavLink {
  label: string
  url: string
  children?: NavLink[]
}

export interface HeaderProps {
  logo?: React.ReactNode
  links: NavLink[]
  ctaText?: string
  ctaUrl?: string
  sticky?: boolean
  transparent?: boolean
}

export function Header({
  logo = (
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Atlas Logo" className="h-8 w-8 object-contain" />
      <span className="text-xl font-bold tracking-tight">Atlas Blocks</span>
    </div>
  ),
  links = [],
  ctaText = "Get Started",
  ctaUrl = "#",
  sticky = true,
  transparent = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "z-[60] w-full transition-all duration-300",
        sticky && "sticky top-0",
        transparent && !isScrolled ? "bg-transparent" : "bg-background/95 backdrop-blur-md border-b border-border",
        isScrolled && "h-16 shadow-sm",
        !isScrolled && "h-20"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          {logo}
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link, idx) => (
            <div key={idx} className="relative group">
              <a 
                href={link.url} 
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
                {link.children && <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />}
              </a>
              
              {link.children && (
                <div className="absolute left-0 top-full hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-xl">
                    {link.children.map((child, childIdx) => (
                      <a
                        key={childIdx}
                        href={child.url}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="sm">Log In</Button>
          <Button size="sm" asChild>
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] z-50 bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-right duration-300">
          <nav className="flex flex-col p-6 space-y-6">
            {links.map((link, idx) => (
              <div key={idx} className="space-y-4">
                <a 
                  href={link.url}
                  className="text-xl font-bold border-b border-border pb-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="pl-4 border-l border-primary/20 space-y-3">
                    {link.children.map((child, childIdx) => (
                      <a
                        key={childIdx}
                        href={child.url}
                        className="block text-muted-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-border">
              <Button variant="ghost" size="lg" className="w-full">Log In</Button>
              <Button size="lg" className="w-full">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
