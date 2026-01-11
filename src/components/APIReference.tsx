interface PropInfo {
  name: string
  type: string
  defaultValue?: string
  description: string
}

interface APIReferenceProps {
  props: PropInfo[]
}

export function APIReference({ props }: APIReferenceProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left font-sans">
        <thead className="bg-muted text-sm font-medium">
          <tr>
            <th className="px-4 py-3">Prop</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Default</th>
            <th className="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3 font-mono text-primary">{prop.name}</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">{prop.type}</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">{prop.defaultValue || "-"}</td>
              <td className="px-4 py-3">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
