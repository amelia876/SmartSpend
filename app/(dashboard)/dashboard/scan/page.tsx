"use client"

import { useState } from "react"
import Link from "next/link"
import { CameraScanner } from "@/components/scanner/camera-scanner"
import { ReceiptUploader } from "@/components/scanner/receipt-uploader"
import { ScanResults } from "@/components/scanner/scan-results"
import { ScanProgress } from "@/components/scanner/scan-progress"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Zap, Upload } from "lucide-react"

interface ScanResult {
  merchant: string
  date: string
  total: number
  items: { name: string; price: number }[]
  category: string
}

export default function ScanPage() {
  const [scanState, setScanState] = useState<"idle" | "camera" | "uploading" | "processing" | "complete">("idle")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [showCamera, setShowCamera] = useState(false)

  const handleFileSelect = async (file: File) => {
    setScanState("uploading")
    setShowCamera(false)

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setScanState("processing")

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock result
    setScanResult({
      merchant: "Whole Foods Market",
      date: "April 14, 2026",
      total: 67.42,
      items: [
        { name: "Organic Bananas", price: 2.99 },
        { name: "Almond Milk", price: 4.49 },
        { name: "Sourdough Bread", price: 5.99 },
        { name: "Chicken Breast", price: 12.99 },
        { name: "Mixed Greens", price: 4.99 },
        { name: "Avocados (3)", price: 5.97 },
        { name: "Olive Oil", price: 14.99 },
        { name: "Greek Yogurt", price: 6.49 },
        { name: "Coffee Beans", price: 8.52 },
      ],
      category: "Groceries",
    })
    setScanState("complete")
  }

  const handleReset = () => {
    setScanState("idle")
    setScanResult(null)
  }

  const handleSave = () => {
    handleReset()
  }

  const handleCameraClose = () => {
    setShowCamera(false)
    setScanState("idle")
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground md:text-3xl">
          Scan Receipt
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Use your camera or upload a photo to extract receipt details
        </p>
      </div>

      {/* Free tier info */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/20 shrink-0">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex-1 sm:hidden">
              <p className="text-sm font-medium text-foreground">2 scans remaining today</p>
              <p className="text-xs text-muted-foreground">Upgrade for unlimited</p>
            </div>
          </div>
          <div className="flex-1 hidden sm:block">
            <p className="font-medium text-foreground">Free Plan: 2 scans remaining today</p>
            <p className="text-sm text-muted-foreground">
              Upgrade to Premium for unlimited scans
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link href="/dashboard/upgrade">Upgrade</Link>
          </Button>
        </CardContent>
      </Card>

      {showCamera ? (
        <div className="flex justify-center">
          <CameraScanner onCapture={handleFileSelect} onClose={handleCameraClose} />
        </div>
      ) : scanState === "idle" ? (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <Card className="border-border cursor-pointer hover:border-primary hover:shadow-lg transition-all" onClick={() => setShowCamera(true)}>
            <CardContent className="flex flex-col items-center justify-center p-6 sm:p-12 text-center">
              <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">Open Camera</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Use your camera to scan a receipt
              </p>
              <Button className="gap-2" size="sm">
                <Camera className="h-4 w-4" />
                Open Camera
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-0">
              <ReceiptUploader onFileSelect={handleFileSelect} />
            </CardContent>
          </Card>
        </div>
      ) : (scanState === "uploading" || scanState === "processing") ? (
        <ScanProgress state={scanState} />
      ) : scanState === "complete" && scanResult ? (
        <ScanResults result={scanResult} onSave={handleSave} onDiscard={handleReset} />
      ) : null}
    </div>
  )
}
