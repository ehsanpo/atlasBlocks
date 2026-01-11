import { useEffect } from 'react'
import { HeaderMinimal } from '../HeaderMinimal'
import { HeroPremium } from '../HeroPremium'
import { FeatureBlock } from '../FeatureBlock'
import { FAQ } from '../FAQ'
import { Footer } from '../Footer'
import { Box, Code2, Cpu, Globe, Layers, Layout, Zap } from 'lucide-react'

const navLinks = [
  { key: "home", href: "#", label: "HOME" },
  { key: "features", href: "#features", label: "FEATURES" },
]

const shadcnFeatures = [
  {
    title: "Vite + React",
    description: "Built on the fastest modern frontend tooling for a seamless developer experience.",
    icon: <Cpu className="w-5 h-5 text-primary" />
  },
  {
    title: "Shadcn Inspired",
    description: "Follows the popular copy-paste philosophy, giving you full control over the source code.",
    icon: <Layers className="w-5 h-5 text-primary" />
  },
  {
    title: "Tailwind Ready",
    description: "Zero-config styling using standard Tailwind CSS utility classes and OKLCH colors.",
    icon: <Zap className="w-5 h-5 text-primary" />
  }
]

const techFeatures = [
  {
    title: "React & TypeScript",
    description: "Built with the latest React patterns and full type safety for a robust developer experience.",
    icon: <Cpu className="w-5 h-5 text-primary" />
  },
  {
    title: "Tailwind CSS",
    description: "Utilizing utility-first CSS for rapid UI development and easy customization of every component.",
    icon: <Globe className="w-5 h-5 text-primary" />
  },
  {
    title: "OKLCH Colors",
    description: "Modern color space for consistent, perceptually uniform colors across light and dark modes.",
    icon: <Box className="w-5 h-5 text-primary" />
  }
]

const mcpFeatures = [
  {
    title: "Context-Aware UI",
    description: "Expose your UI state and components directly to LLMs through standardized context protocols.",
    icon: <Layers className="w-5 h-5 text-primary" />
  },
  {
    title: "Agent-Ready Blocks",
    description: "Every component is semantic and optimized for LLM understanding, enabling AI agents to navigate with ease.",
    icon: <Layout className="w-5 h-5 text-primary" />
  },
  {
    title: "Dynamic Tooling",
    description: "Transform your frontend into a suite of usable tools for AI agents with minimal configuration.",
    icon: <Code2 className="w-5 h-5 text-primary" />
  }
]

const faqs = [
  {
    id: 1,
    question: "How do I use the Atlas MCP in my AI agent?",
    answer: "Simply add the following URL to your MCP client (like Claude Desktop or Cursor): https://atlas-blocks-mcp.vercel.app/api/mcp. This allows your agent to understand and generate these components directly."
  },
  {
    id: 2,
    question: "Are these Shadcn components?",
    answer: "Yes, they are built with the same philosophy. They are pure React + Tailwind components that you can copy, paste, and modify to your heartbeat's content."
  },
  {
    id: 3,
    question: "Is it compatible with all LLMs?",
    answer: "Yes, it's a protocol-agnostic approach that works with OpenAI, Anthropic, and open-source models like Llama."
  }
]

const footerSections = [
  {
    title: "Community",
    links: [
      { label: "GitHub", url: "https://github.com/ehsanpo/atlasBlocks" },
    ]
  }
]

export function HomePagePreview({ onBack, onDocsClick }: { onBack?: () => void, onDocsClick?: () => void }) {
  useEffect(() => {
    const appHeader = document.querySelector('header.sticky.top-0')
    if (appHeader) (appHeader as HTMLElement).style.display = 'none'
    
    return () => {
      if (appHeader) (appHeader as HTMLElement).style.display = 'flex'
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-y-auto z-[100] bg-background selection:bg-primary/30 scroll-smooth">
      <div className="fixed bottom-8 right-8 z-[200]">
        <button 
          onClick={onBack}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/10"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Components</span>
        </button>
      </div>

      <HeaderMinimal 
        navLinks={navLinks}
        logoText="Atlas Blocks"
        githubUrl="https://github.com/ehsanpo/atlasBlocks"
      />
      
      <main>
        <HeroPremium 
          tag="Now in Public Beta"
          titleLine1="React"
          titleLine2="Content Blocks"
          primaryButtonText="Start Building"
          secondaryButtonText="Read Docs"
          onSecondaryClick={onDocsClick}
          onPrimaryClick={onBack}
        />

        <div id="shadcn" className="py-32">
          <FeatureBlock 
            tag="Architecture"
            headline="Premium <span class='text-primary'>Shadcn</span> & React components."
            features={shadcnFeatures}
            image="/logo-text.png"
            appTitle="shadcn-v2.0"
          />
        </div>

        <div id="features" className="py-32 bg-muted/20 clip">
          <FeatureBlock 
            tag="Cutting Edge"
            headline="Built with the <span class='text-primary'>modern stack</span>."
            features={techFeatures}
            image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop"
            appTitle="atlas-os-v1"
            imageOnLeft={true}
          />
        </div>

        <div className="py-32">
          <FeatureBlock 
            tag="Agentic Interface"
            headline="Native <span class='text-primary'>MCP for AI</span> integration."
            features={mcpFeatures}
            image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop"
            appTitle="mcp-context-server"
          />
        </div>


        <div className="py-32">
          <FAQ 
            questions={faqs}
            align="wide"
          />
        </div>
      </main>

      <Footer 
        sections={footerSections}
        description="Premium Shadcn-inspired React components. Built for the modern web."
        align="wide"
        gradientBackground={true}
      />
    </div>
  )
}
