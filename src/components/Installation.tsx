import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { CodeBlock } from "./CodeBlock"

interface InstallationProps {
  componentName: string
  manualCode: string
}

export function Installation({ componentName, manualCode }: InstallationProps) {
  const npmCommand = `npx shadcn-ui@latest add ${componentName.toLowerCase().replace(/\s+/g, '-')}`
  const yarnCommand = `yarn shadcn-ui add ${componentName.toLowerCase().replace(/\s+/g, '-')}`
  const pnpmCommand = `pnpm dlx shadcn-ui@latest add ${componentName.toLowerCase().replace(/\s+/g, '-')}`
  const bunCommand = `bun x shadcn-ui@latest add ${componentName.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="space-y-6">
      <Tabs defaultValue="cli" className="w-full">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli" className="mt-4">
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-4 border-b border-border rounded-none w-full justify-start">
              <TabsTrigger value="npm" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none">npm</TabsTrigger>
              <TabsTrigger value="yarn" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none">yarn</TabsTrigger>
              <TabsTrigger value="pnpm" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none">pnpm</TabsTrigger>
              <TabsTrigger value="bun" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code={npmCommand} language="bash" />
            </TabsContent>
            <TabsContent value="yarn">
              <CodeBlock code={yarnCommand} language="bash" />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code={pnpmCommand} language="bash" />
            </TabsContent>
            <TabsContent value="bun">
              <CodeBlock code={bunCommand} language="bash" />
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
