import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { CodeBlock } from "./CodeBlock"

interface InstallationProps {
  componentName: string
  manualCode: string
}

export function Installation({ componentName, manualCode }: InstallationProps) {
  const componentMap: Record<string, string> = {
    "Article List": "ArticleList.tsx",
    "Banner": "Banner.tsx",
    "Call to Action": "CTA.tsx",
    "FAQ": "FAQ.tsx",
    "Filter Posts": "FilterPost.tsx",
    "Hero Slider": "HeroSlider.tsx",
    "Links": "Links.tsx",
    "Testimonials": "Testimonials.tsx",
    "Text + Image": "TextImage.tsx",
    "Header": "Header.tsx",
    "Footer": "Footer.tsx",
    "Feature Block": "Feature.tsx",
    "Gallery Block": "Gallery.tsx",
    "Statistic Block": "Statistic.tsx",
    "Our Team Block": "Team.tsx",
    "Contact Form": "ContactForm.tsx",
  }

  const fileName = componentMap[componentName] || (componentName.replace(/\s+/g, '') + '.tsx')
  const rawUrl = `https://raw.githubusercontent.com/ehsanpo/atlasBlocks/main/src/components/${fileName}`
  
  const bashCommand = `npx shadcn@latest add "${rawUrl}"`

  return (
    <div className="space-y-6">
      <Tabs defaultValue="cli" className="w-full">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="mt-4">
          <Tabs defaultValue="bash" className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-4 border-b border-border rounded-none w-full justify-start">
              <TabsTrigger value="bash" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none">Command</TabsTrigger>
            </TabsList>
            <TabsContent value="bash">
              <CodeBlock code={bashCommand} language="bash" />
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="manual" className="mt-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Copy and paste the following code into your project.</p>
            <CodeBlock code={manualCode} language="tsx" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
