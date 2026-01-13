import React from "react"
import { cn } from "@/lib/utils"

export interface FeatureBlockItem {
  icon?: string | React.ReactNode
  title: string
  description: string
}

export interface FeatureBlockProps {
  tag?: string
  headline: string
  features?: FeatureBlockItem[]
  image: string
  appTitle?: string
  imageOnLeft?: boolean
  className?: string
}

export function FeatureBlock({
  tag,
  headline,
  features = [],
  image,
  appTitle = "preview-v1",
  imageOnLeft = false,
  className,
}: FeatureBlockProps) {
  return (
    <section 
      className={cn("py-20 overflow-hidden", className)}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
          imageOnLeft && "direction-rtl"
        )}>
          
          <div className={cn(
            "space-y-6 reveal-wrapper",
            imageOnLeft ? "lg:order-2" : "lg:order-1"
          )}>
            {tag && (
              <span className="inline-block font-mono text-xs text-primary uppercase tracking-widest border border-primary/20 bg-primary/5 px-2 py-1 rounded">
                {tag}
              </span>
            )}
            
            <h2 
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
            
            {features.length > 0 && (
              <ul className="space-y-4 pt-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors shrink-0">
                      {typeof feature.icon === 'string' ? (
                        <img src={feature.icon} alt="" className="w-5 h-5 object-contain" />
                      ) : (
                        feature.icon
                      )}
                    </div>
                    <div>
                      <h4 className="text-foreground font-bold text-sm uppercase">{feature.title}</h4>
                      <p className="font-mono text-xs text-muted-foreground mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={cn(
            "relative group reveal-wrapper perspective-container",
            imageOnLeft ? "lg:order-1" : "lg:order-2"
          )}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505] rotate-3d hover:transition-transform duration-500">
                 <div className="h-8 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-[8px] opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 text-yellow-500 opacity-70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 text-green-500 opacity-70"></div>
                    <div className="ml-auto text-[10px] font-mono text-muted-foreground/50">{appTitle}</div>
                 </div>
                 
                 <img src={image} alt={headline} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
