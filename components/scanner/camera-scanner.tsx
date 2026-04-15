"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, X, Check } from "lucide-react"

interface CameraScannerProps {
  onCapture: (file: File) => void
  onClose: () => void
}

export function CameraScanner({ onCapture, onClose }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [error, setError] = useState<string>("")
  const [isFrontCamera, setIsFrontCamera] = useState(false)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: isFrontCamera ? "user" : "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play()
            setIsCameraReady(true)
          }
        }
      } catch (err) {
        setError("Unable to access camera. Please check permissions.")
        console.error("Camera error:", err)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [isFrontCamera])

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "receipt-scan.jpg", { type: "image/jpeg" })
            onCapture(file)
          }
        }, "image/jpeg", 0.95)
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onCapture(file)
    }
  }

  return (
    <Card className="w-full max-w-2xl border-border">
      <CardContent className="p-0">
        <div className="relative bg-black">
          {error ? (
            <div className="aspect-video flex flex-col items-center justify-center bg-secondary">
              <div className="text-center">
                <p className="text-sm text-destructive mb-4">{error}</p>
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                autoPlay
                playsInline
              />
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <div className="animate-spin mb-4">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-primary-foreground">Loading camera...</p>
                  </div>
                </div>
              )}
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />

          {/* Controls Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 pointer-events-auto flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFrontCamera(!isFrontCamera)}
                className="rounded-full"
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Center Guides */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-80 h-60 border-2 border-primary rounded-lg opacity-50" />
            </div>
          </div>
        </div>

        <div className="bg-card p-4 flex gap-2 justify-center flex-wrap">
          <Button
            onClick={capturePhoto}
            disabled={!isCameraReady}
            size="lg"
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            Capture Receipt
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Upload Photo
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  )
}
