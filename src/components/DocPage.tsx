import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { CodeBlock } from "./CodeBlock"
import { Installation } from "./Installation"
import { APIReference } from "./APIReference"
import { useState, useEffect } from "react"

interface PropInfo {
  name: string
  type: string
  defaultValue?: string
  description: string
}

interface DocPageProps<T> {
  name: string
  description: string
  children: React.ReactNode // The interactive preview
  code: string
  installationCode: string
  usageCode: string
  apiProps: PropInfo[]
  sampleData: T
  onSampleDataChange: (data: T) => void
  controls?: React.ReactNode // Optional minimal controls
}

export function DocPage<T>({
  name,
  description,
  children,
  code,
  installationCode,
  usageCode,
  apiProps,
  sampleData,
  onSampleDataChange,
  controls
}: DocPageProps<T>) {
  const [dataInput, setDataInput] = useState(JSON.stringify(sampleData, null, 2))
  const [error, setError] = useState<string | null>(null)

  // Sync internal state when sampleData changes from outside
  useEffect(() => {
    setDataInput(JSON.stringify(sampleData, null, 2))
  }, [sampleData])

  const handleDataChange = (val: string) => {
    setDataInput(val)
    try {
      const parsed = JSON.parse(val)
      onSampleDataChange(parsed)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <div className="space-y-10 pb-20 max-w-full overflow-hidden">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">{name}</h1>
        <p className="text-xl text-muted-foreground">{description}</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Interactive</div>
        </div>
        
        {controls && (
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border bg-card shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">Controls</div>
            {controls}
          </div>
        )}

        <div className="rounded-2xl border border-border bg-muted/20 p-4 md:p-8 min-h-[400px] flex items-center justify-center overflow-hidden shadow-inner relative">
          {children}
        </div>
      </section>

      <Tabs defaultValue="code" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none gap-6 mb-6 overflow-x-auto scrollbar-none">
          <TabsTrigger value="code" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none pb-4 text-sm font-medium">Implementation</TabsTrigger>
          <TabsTrigger value="installation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none pb-4 text-sm font-medium">Installation</TabsTrigger>
          <TabsTrigger value="usage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none pb-4 text-sm font-medium">Usage</TabsTrigger>
          <TabsTrigger value="api" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none pb-4 text-sm font-medium">API Reference</TabsTrigger>
          <TabsTrigger value="sampledata" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none pb-4 text-sm font-medium">Sample Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="code" className="mt-0 focus-visible:outline-none">
          <CodeBlock code={code} />
        </TabsContent>

        <TabsContent value="installation" className="mt-0 focus-visible:outline-none">
          <Installation componentName={name} manualCode={installationCode} />
        </TabsContent>

        <TabsContent value="usage" className="mt-0 focus-visible:outline-none">
          <CodeBlock code={usageCode} />
        </TabsContent>

        <TabsContent value="api" className="mt-0 focus-visible:outline-none">
          <APIReference props={apiProps} />
        </TabsContent>

        <TabsContent value="sampledata" className="mt-0 focus-visible:outline-none">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Modify the component's data in real-time. Use valid JSON format.</p>
            <div className="relative">
              <textarea
                value={dataInput}
                onChange={(e) => handleDataChange(e.target.value)}
                className="w-full h-[400px] font-mono text-xs md:text-sm p-6 bg-slate-950 text-slate-50 rounded-xl border border-border shadow-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all overflow-auto"
                spellCheck={false}
              />
              {error && (
                <div className="absolute bottom-6 left-6 right-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg backdrop-blur-md">
                  <span className="font-bold">Invalid JSON:</span> {error}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
