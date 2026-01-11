import { cn } from "@/lib/utils"
import type { PrimaryColor } from "../App"
import { ChevronLeft, ChevronRight, Palette } from "lucide-react"

export interface ComponentItem {
  id: string
  name: string
}

interface SidebarProps {
  components: ComponentItem[]
  activeComponent: string
  onSelectComponent: (id: string) => void
  primaryColor: PrimaryColor
  onPrimaryColorChange: (color: PrimaryColor) => void
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export function Sidebar({ 
  components, 
  activeComponent, 
  onSelectComponent,
  primaryColor,
  onPrimaryColorChange,
  isCollapsed,
  setIsCollapsed
}: SidebarProps) {
  const colorOptions: { id: PrimaryColor, label: string, lch: string }[] = [
    { id: 'blue', label: 'Blue', lch: 'oklch(0.55 0.18 250)' },
    { id: 'green', label: 'Green', lch: 'oklch(0.6 0.2 145)' },
    { id: 'violet', label: 'Violet', lch: 'oklch(0.6 0.18 290)' },
    { id: 'yellow', label: 'Yellow', lch: 'oklch(0.78 0.18 85)' },
  ]

  return (
    <aside className={cn(
      "hidden md:block border-r border-border bg-card transition-all duration-300 ease-in-out relative z-[60]",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-primary text-primary-foreground rounded-full p-1 shadow-lg hover:scale-110 active:scale-95 transition-all z-[70]"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Header */}
        <div className={cn("border-b border-border p-6 transition-all", isCollapsed && "px-4")}>
          <button 
            onClick={() => onSelectComponent('home-page')}
            className="flex items-center gap-3 mb-1 hover:opacity-80 transition-opacity"
          >
            <img src="/atlasBlocks/logo.png" alt="Atlas Logo" className="h-6 w-6 object-contain" />
            {!isCollapsed && <h2 className="text-lg font-semibold truncate">Atlas Blocks</h2>}
          </button>
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground mb-4">
              Component Library
            </p>
          )}

          <div className="space-y-3 mt-4">
            {!isCollapsed && <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Theme Color</p>}
            <div className={cn("flex items-center gap-2", isCollapsed ? "flex-col" : "flex-wrap")}>
              {isCollapsed ? (
                <div className="p-1 rounded-lg bg-muted">
                    <Palette size={16} className="text-muted-foreground" />
                </div>
              ) : (
                colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => onPrimaryColorChange(color.id)}
                    className={cn(
                      "group relative h-6 w-6 rounded-full transition-all active:scale-90",
                      primaryColor === color.id ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "hover:scale-110"
                    )}
                    style={{ backgroundColor: color.lch }}
                    title={color.label}
                  >
                    {primaryColor === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <ul className="space-y-1">
            {components.map((component) => (
              <li key={component.id}>
                <button
                  onClick={() => onSelectComponent(component.id)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors flex items-center gap-3",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeComponent === component.id && "bg-accent text-accent-foreground font-medium",
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? component.name : ""}
                >
                  {isCollapsed ? (
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        activeComponent === component.id ? "bg-primary" : "bg-muted-foreground/30"
                    )} />
                  ) : (
                    <span className="truncate">{component.name}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className={cn("border-t border-border p-4 transition-all", isCollapsed && "p-2")}>
          {!isCollapsed ? (
            <p className="text-[10px] text-muted-foreground/60 text-center uppercase tracking-tight">
              © {new Date().getFullYear()} by Ehsan Pourhadi
            </p>
          ) : (
            <div className="text-[8px] text-center font-mono text-muted-foreground/40 font-bold">EP</div>
          )}
        </div>
      </div>
    </aside>
  )
}


