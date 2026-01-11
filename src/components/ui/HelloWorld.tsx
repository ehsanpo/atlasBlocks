import * as React from "react"
import { cn } from "../../lib/utils"

export interface HelloWorldProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
}

const HelloWorld = React.forwardRef<HTMLDivElement, HelloWorldProps>(
  ({ className, name = "World", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm",
          "hover:shadow-md transition-all duration-300",
          "bg-gradient-to-br from-background to-muted/50",
          className
        )}
        {...props}
      >
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
          Hello, {name}!
        </h1>
        <p className="text-muted-foreground">
          Welcome to your own shadcn-like component library.
        </p>
        <div className="mt-4 flex gap-2">
           <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
             Vite
           </span>
           <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
             React
           </span>
           <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
             Tailwind
           </span>
        </div>
      </div>
    )
  }
)
HelloWorld.displayName = "HelloWorld"

export { HelloWorld }
