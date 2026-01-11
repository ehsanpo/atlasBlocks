import { cn } from "@/lib/utils"
import type { PrimaryColor } from "../App"

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
}

export function Sidebar({ 
  components, 
  activeComponent, 
  onSelectComponent,
  primaryColor,
  onPrimaryColorChange
}: SidebarProps) {
  const colorOptions: { id: PrimaryColor, label: string, lch: string }[] = [
    { id: 'blue', label: 'Blue', lch: 'oklch(0.55 0.18 250)' },
    { id: 'green', label: 'Green', lch: 'oklch(0.6 0.2 145)' },
    { id: 'violet', label: 'Violet', lch: 'oklch(0.6 0.18 290)' },
    { id: 'yellow', label: 'Yellow', lch: 'oklch(0.78 0.18 85)' },
  ]

  return (
    <aside className="hidden md:block w-64 border-r border-border bg-card">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-3 mb-1">
            <img src="/logo.png" alt="Atlas Logo" className="h-6 w-6 object-contain" />
            <h2 className="text-lg font-semibold">Atlas UI</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Component Library
          </p>

          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Theme Color</p>
            <div className="flex items-center gap-2">
              {colorOptions.map((color) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {components.map((component) => (
              <li key={component.id}>
                <button
                  onClick={() => onSelectComponent(component.id)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeComponent === component.id && "bg-accent text-accent-foreground font-medium"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{component.name}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-[10px] text-muted-foreground/60 text-center uppercase tracking-tight">
            © {new Date().getFullYear()} by Ehsan Pourhadi
          </p>
        </div>
      </div>
    </aside>
  )
}


