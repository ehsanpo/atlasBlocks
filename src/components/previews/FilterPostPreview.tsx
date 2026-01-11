import { useState } from 'react'
import { FilterPost } from '../FilterPost'
import { DocPage } from '../DocPage'

const sampleCategories = [
  { id: 1, slug: "web-design", name: "Web Design" },
  { id: 2, slug: "app-development", name: "App Development" },
  { id: 3, slug: "branding", name: "Branding" },
  { id: 4, slug: "marketing", name: "Marketing" }
]

const sampleProjects = [
  {
    id: 1,
    title: "Chromate Flow",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop",
    categories: ["branding", "marketing"],
    link: "#project-1",
    date: "Jan 12, 2024",
    excerpt: "Vibrant purple and orange pigment merging into a high-energy abstract wave."
  },
  {
    id: 2,
    title: "Azure Nebula",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop",
    categories: ["web-design"],
    link: "#project-2",
    date: "Feb 05, 2024",
    excerpt: "Deep blue and fiery orange textures creating a cosmic-like liquid landscape."
  },
  {
    id: 3,
    title: "Midnight Onyx",
    image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&h=600&fit=crop",
    categories: ["branding"],
    link: "#project-3",
    date: "Mar 18, 2024",
    excerpt: "Deep obsidian flows with golden accents, creating a high-contrast liquid metal effect."
  },
  {
    id: 4,
    title: "Velvet Crimson",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=600&fit=crop",
    categories: ["marketing", "app-development"],
    link: "#project-4",
    date: "Apr 22, 2024",
    excerpt: "Striking red and black pigment swirls designed for bold visual impact."
  },
  {
    id: 5,
    title: "Ether Drift",
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&h=600&fit=crop",
    categories: ["web-design", "branding"],
    link: "#project-5",
    date: "May 10, 2024",
    excerpt: "Soft pastel gradients and flowing shapes defining a modern, airy interface."
  },
  {
    id: 6,
    title: "Emerald Surge",
    image: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=800&h=600&fit=crop",
    categories: ["app-development"],
    link: "#project-6",
    date: "Jun 14, 2024",
    excerpt: "Complex green and teal patterns inspired by deep-sea organic movement."
  }
]

const componentCode = `import { useState, useMemo } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ChevronDown, Filter } from "lucide-react"

export interface PostProject {
  id: number | string
  title: string
  image: string
  categories: string[]
  link: string
  date?: string
  excerpt?: string
}

export interface Category {
  id: number | string
  slug: string
  name: string
}

export interface FilterPostProps {
  projects: PostProject[]
  categories: Category[]
  showFilters?: boolean
  backgroundColor?: string
  align?: "default" | "wide" | "full"
  columns?: 2 | 3 | 4
  className?: string
}

export function FilterPost({
  projects = [],
  categories = [],
  showFilters = true,
  backgroundColor,
  align = "default",
  columns = 3,
  className,
}: FilterPostProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects
    return projects.filter(project => project.categories.includes(activeCategory))
  }, [projects, activeCategory])

  const activeCategoryName = useMemo(() => {
    if (activeCategory === "all") return "All"
    return categories.find(c => c.slug === activeCategory)?.name || "Unknown"
  }, [activeCategory, categories])

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }

  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20",
        align === "wide" && "max-w-7xl mx-auto px-4",
        align === "full" && "w-full",
        align === "default" && "max-w-6xl mx-auto px-4",
        className
      )}
      style={{ backgroundColor }}
    >
      <div className="container mx-auto">
        {showFilters && (
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6">
              <Button
                variant={activeCategory === "all" ? "default" : "secondary"}
                onClick={() => { setActiveCategory("all"); setIsFilterMenuOpen(false); }}
                size="sm"
              >
                All Projects
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className={cn("gap-2", activeCategory !== "all" && "border-primary text-primary")}
                >
                  <Filter className="h-3.5 w-3.5" />
                  Categories: <span className="font-bold">{activeCategoryName}</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isFilterMenuOpen && "rotate-180")} />
                </Button>
                {isFilterMenuOpen && (
                  <div className="absolute left-0 top-full z-40 mt-2 w-64 rounded-lg border border-border bg-card p-2 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="grid grid-cols-1 gap-1">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => { setActiveCategory(category.slug); setIsFilterMenuOpen(false); }}
                          className={cn(
                            "w-full px-3 py-2 text-left text-sm font-medium rounded-md transition-colors",
                            activeCategory === category.slug ? "bg-primary/10 text-primary" : "hover:bg-muted"
                          )}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className={cn("grid gap-6", columnClasses[columns])}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <a href={project.link} className="block aspect-[4/3] overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map(catSlug => (
                      <span key={catSlug} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded">
                        {catSlug}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
              <div className="p-4 border-t border-border group-hover:border-transparent transition-colors">
                <h3 className="font-bold truncate text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}`

const usageCode = `import { FilterPost } from "@/components/FilterPost"

const projects = [
  { id: 1, title: "Project A", image: "...", categories: ["web"], link: "#", date: "Jan 1, 2024" }
]
const categories = [{ id: 1, slug: "web", name: "Web" }]

export default function WorkPage() {
  return (
    <FilterPost 
      projects={projects} 
      categories={categories} 
      columns={3}
    />
  )
}`

const apiProps = [
  { name: "projects", type: "PostProject[]", description: "Array of project/post items to display." },
  { name: "categories", type: "Category[]", description: "Array of category objects for filtering." },
  { name: "columns", type: "2 | 3 | 4", defaultValue: "3", description: "Number of grid columns on desktop screens." },
  { name: "showFilters", type: "boolean", defaultValue: "true", description: "Whether to display the filter controls." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment and width." },
]

export function FilterPostPreview() {
  const [data, setData] = useState({
    projects: sampleProjects,
    categories: sampleCategories,
    showFilters: true,
    align: "default" as const,
    columns: 3 as any
  })

  return (
    <DocPage
      name="Filter Posts"
      description="An interactive WordPress-style grid for showcasing posts with real-time horizontal filtering."
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
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Columns</label>
            <select 
              value={data.columns} 
              onChange={(e) => setData({ ...data, columns: Number(e.target.value) as any })}
              className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-primary outline-none"
            >
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="showFilters"
              checked={data.showFilters} 
              onChange={(e) => setData({ ...data, showFilters: e.target.checked })}
              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="showFilters" className="text-xs font-medium text-muted-foreground whitespace-nowrap">Show Filters</label>
          </div>
        </div>
      }
    >
      <FilterPost 
        {...data}
      />
    </DocPage>
  )
}
