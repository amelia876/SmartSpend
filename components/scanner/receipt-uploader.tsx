"use client"

import { useCallback, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Image as ImageIcon } from "lucide-react"

interface ReceiptUploaderProps {
  onFileSelect: (file: File) => void
}

export function ReceiptUploader({ onFileSelect }: ReceiptUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-border"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
          Upload Receipt
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Drag and drop your receipt image here, or click to browse
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <label className="cursor-pointer">
              <ImageIcon className="mr-2 h-4 w-4" />
              Choose File
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Supports JPG, PNG, HEIC up to 10MB
        </p>
      </CardContent>
    </Card>
  )
}
