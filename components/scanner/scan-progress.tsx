import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Upload, Sparkles } from "lucide-react"

interface ScanProgressProps {
  state: "uploading" | "processing"
}

export function ScanProgress({ state }: ScanProgressProps) {
  return (
    <Card className="border-border">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {state === "uploading" ? (
              <Upload className="h-8 w-8 text-primary" />
            ) : (
              <Sparkles className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1">
            <Spinner className="h-5 w-5 text-primary" />
          </div>
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          {state === "uploading" ? "Uploading Receipt..." : "Processing with AI..."}
        </h3>
        <p className="text-sm text-muted-foreground">
          {state === "uploading"
            ? "Please wait while we upload your receipt"
            : "Extracting merchant, items, and total amount"}
        </p>
      </CardContent>
    </Card>
  )
}
