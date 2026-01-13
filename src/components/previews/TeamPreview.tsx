import { useState } from 'react'
import { Team } from '../Team'
import { DocPage } from '../DocPage'

const sampleMembers = [
  { 
    id: 1, 
    name: "Dr. Alexander Forge", 
    role: "Chief Architect", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop", 
    bio: "Passionate about building scalable distributed systems and modern UI architecture.",
    twitterUrl: "#",
    linkedinUrl: "#",
    githubUrl: "#"
  },
  { 
    id: 2, 
    name: "Sarah Jenkins", 
    role: "Product Design Lead", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop", 
    bio: "Focused on creating intuitive user experiences that bridge the gap between human and machine.",
    twitterUrl: "#",
    linkedinUrl: "#"
  },
  { 
    id: 3, 
    name: "Marcus Aurelius", 
    role: "Senior Frontend Engineer", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop", 
    bio: "Master of CSS and modern React patterns, dedicated to pixel-perfect implementation.",
    twitterUrl: "#",
    githubUrl: "#"
  },
]

const componentCode = `import { cn } from "@/lib/utils"
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
  // Implementation...
}`

const usageCode = `import { Team } from "@/components/Team"

const members = [
  { id: 1, name: "Alice", role: "CEO", image: "..." }
]

export default function Page() {
  return (
    <Team 
      headline="Our Leadership"
      members={members}
      columns={3}
    />
  )
}`

const apiProps = [
  { name: "headline", type: "string", defaultValue: "Meet Our Experts", description: "Main section heading." },
  { name: "subheadline", type: "string", description: "Supporting text for the heading." },
  { name: "members", type: "TeamMember[]", description: "Array of team member objects with images and social links." },
  { name: "columns", type: "2 | 3 | 4", defaultValue: "3", description: "Number of columns on desktop view." },
  { name: "align", type: "'default' | 'wide' | 'full'", defaultValue: "'default'", description: "Container alignment." },
]

export function TeamPreview() {
  const [data, setData] = useState({
    headline: "The Minds Behind Atlas",
    subheadline: "We are a diverse team of engineers, designers, and strategists committed to excellence.",
    members: sampleMembers,
    columns: 3 as const,
    align: "default" as const
  })

  return (
    <DocPage
      name="Our Team Block"
      description="A high-end team showcase component with social overlays and smooth transitions."
      code={componentCode}
      installationCode={componentCode}
      usageCode={usageCode}
      apiProps={apiProps}
      sampleData={data}
      onSampleDataChange={setData}
      controls={
        <div className="flex flex-wrap items-center gap-6">
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
        </div>
      }
    >
      <div className="w-full">
        <Team 
          {...data}
        />
      </div>
    </DocPage>
  )
}
