import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

export interface NavLink {
  key: string
  href: string
  label: string
}

export interface HeaderMinimalProps {
  logoText?: string
  logoImage?: string
  navLinks?: NavLink[]
  githubUrl?: string
  githubLabel?: string
  currentPage?: string
  className?: string
}

export function HeaderMinimal({
  logoText = "Atlas Blocks",
  logoImage,
  navLinks = [
    { key: "home", href: "#", label: "HOME" },
    { key: "features", href: "#", label: "FEATURES" },
    { key: "about", href: "#", label: "ABOUT" },
    { key: "contact", href: "#", label: "CONTACT" },
  ],
  githubUrl = "https://github.com",
  githubLabel = "GITHUB",
  currentPage = "home",
  className,
}: HeaderMinimalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className={cn("fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[400px] md:max-w-2xl transition-all duration-300", className)}>
      <div className="rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between border border-white/10 bg-[#050505]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
        <a 
          href="#" 
          className="font-black text-lg tracking-tighter uppercase flex items-center gap-2.5 group shrink-0"
        >
          {logoImage ? (
            <img 
              src={logoImage} 
              alt={logoText} 
              className="w-6 h-6 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300 object-contain" 
            />
          ) : (
             <div className="w-6 h-6 md:w-5 md:h-5 bg-primary rounded-lg group-hover:scale-110 transition-transform duration-300" />
          )}
          <span className="text-white text-base md:text-lg hover:text-primary transition-all duration-300">
            {logoText}
          </span>
        </a>
        
        <div className="hidden md:flex gap-8 font-mono text-[10px] tracking-widest font-medium text-white/70">
          {navLinks.map((link) => (
            <a 
              key={link.key}
              href={link.href} 
              className={cn(
                "transition-colors hover:text-white relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                currentPage === link.key ? "text-white after:w-full" : ""
              )}
            >
              {link.label}
            </a>
          ))}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
              {githubLabel} <Icons.ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/90 p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-90" 
          aria-label="Menu"
        >
          {isOpen ? <Icons.X className="w-5 h-5" /> : <Icons.Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className={cn(
        "absolute top-[calc(100%+12px)] left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex-col gap-2 origin-top transition-all duration-300 shadow-2xl shadow-black/80 ring-1 ring-white/5",
        isOpen ? "flex scale-100 opacity-100" : "hidden scale-95 opacity-0"
      )}>
        {navLinks.map((link) => (
          <a 
            key={link.key}
            href={link.href} 
            onClick={() => setIsOpen(false)}
            className={cn(
              "text-sm font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between group",
              currentPage === link.key ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            {link.label}
            <Icons.ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-white/50 w-4 h-4" />
          </a>
        ))}
        {githubUrl && (
          <>
            <div className="h-px bg-white/10 my-1"></div>
            <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium text-white/50 py-3 px-4 flex items-center justify-between hover:text-white transition-colors"
            >
              {githubLabel} <Icons.ExternalLink className="w-3.5 h-3.5" />
            </a>
          </>
        )}
      </div>
    </nav>
  )
}
