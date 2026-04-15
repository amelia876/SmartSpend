import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Store, Calendar, Tag, DollarSign } from "lucide-react"

interface ScanResult {
  merchant: string
  date: string
  total: number
  items: { name: string; price: number }[]
  category: string
}

interface ScanResultsProps {
  result: ScanResult
  onSave: () => void
  onDiscard: () => void
}

export function ScanResults({ result, onSave, onDiscard }: ScanResultsProps) {
  return (
    <Card className="border-primary/50 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-lg">Scan Results</CardTitle>
          <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
            Successfully Scanned
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="grid gap-3 rounded-lg bg-secondary p-4">
          <div className="flex items-center gap-3">
            <Store className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Merchant</p>
              <p className="font-medium text-foreground">{result.merchant}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">{result.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Category</p>
              <p className="font-medium text-foreground">{result.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-display text-xl font-bold text-foreground">
                ${result.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Items ({result.items.length})
          </p>
          <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-border">
            {result.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 odd:bg-secondary/50"
              >
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={onSave} className="flex-1 gap-2">
            <Check className="h-4 w-4" />
            Save Expense
          </Button>
          <Button onClick={onDiscard} variant="outline" className="gap-2">
            <X className="h-4 w-4" />
            Discard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
