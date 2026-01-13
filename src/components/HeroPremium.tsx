import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

export interface HeroPremiumProps {
  tag?: string
  titleLine1?: string
  titleLine2?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  onPrimaryClick?: () => void
  secondaryButtonText?: string
  secondaryButtonLink?: string
  onSecondaryClick?: () => void
  className?: string
}

export function HeroPremium({
  tag = "System v2.0 Online",
  titleLine1 = "Supercharge ",
  titleLine2 = "your web app",
  primaryButtonText = "Download",
  primaryButtonLink = "#",
  onPrimaryClick,
  secondaryButtonText = "Documentation",
  secondaryButtonLink = "#",
  onSecondaryClick,
  className,
}: HeroPremiumProps) {
  return (
    <section 
      className={cn("w-full relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-background", className)}
    >
        {/* Background Elements */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none mix-blend-screen animate-pulse duration-[5000ms]"></div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 border border-white/5 rounded-full pl-2 pr-4 py-1 bg-black/40 backdrop-blur-md hover:border-white/10 transition-colors">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{tag}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-black text-6xl md:text-9xl tracking-tighter uppercase leading-[0.85] select-none text-white drop-shadow-2xl">
                {titleLine1} <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">{titleLine2}</span>
            </h1>
            
            {/* Actions */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                {onPrimaryClick ? (
                    <button 
                        onClick={() => {
                            console.log("HeroPremium: Primary button clicked")
                            onPrimaryClick()
                        }} 
                        className={cn("h-14 px-10 font-black text-sm uppercase tracking-widest rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 bg-white text-black hover:bg-gray-200 transition-all")}
                    >
                        <span>{primaryButtonText}</span>
                        <Icons.ArrowDown className="w-5 h-5" />
                    </button>
                ) : (
                    <a 
                        href={primaryButtonLink} 
                        className={cn("h-14 px-10 font-black text-sm uppercase tracking-widest rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 bg-white text-black hover:bg-gray-200 transition-all")}
                    >
                        <span>{primaryButtonText}</span>
                        <Icons.ArrowDown className="w-5 h-5" />
                    </a>
                )}

                {onSecondaryClick ? (
                    <button 
                        onClick={() => {
                            console.log("HeroPremium: Secondary button clicked")
                            onSecondaryClick()
                        }} 
                        className={cn("h-14 px-10 font-black text-sm uppercase tracking-widest rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 border border-white/20 hover:border-white text-white font-mono text-xs hover:bg-white/5 transition-all")}
                    >
                        <Icons.BookOpen className="w-5 h-5" />
                        <span>{secondaryButtonText}</span>
                    </button>
                ) : (
                    <a 
                        href={secondaryButtonLink} 
                        className={cn("h-14 px-10 font-black text-sm uppercase tracking-widest rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 border border-white/20 hover:border-white text-white font-mono text-xs hover:bg-white/5 transition-all")}
                    >
                        <Icons.BookOpen className="w-5 h-5" />
                        <span>{secondaryButtonText}</span>
                    </a>
                )}
            </div>
        </div>
        
    </section>
  )
}
