interface ComingSoonPreviewProps {
  componentName: string
  originalFiles: {
    php?: string
    twig?: string
    scss?: string
  }
  description?: string
}

export function ComingSoonPreview({ componentName, originalFiles, description }: ComingSoonPreviewProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">🚧</div>
        <h2 className="mb-2 text-2xl font-bold">{componentName}</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          {description || "This component hasn't been converted yet."}
        </p>
        
        <div className="rounded-lg border border-border bg-card p-4 text-left">
          <h3 className="mb-2 text-sm font-semibold">Original WordPress Files</h3>
          <div className="space-y-1 text-xs text-muted-foreground">
            {originalFiles.php && <p>📄 {originalFiles.php}</p>}
            {originalFiles.twig && <p>📄 {originalFiles.twig}</p>}
            {originalFiles.scss && <p>📄 {originalFiles.scss}</p>}
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Select another component from the sidebar or wait for this one to be converted.
        </p>
      </div>
    </div>
  )
}
