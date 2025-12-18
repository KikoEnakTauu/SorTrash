"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, X, Loader2, Video, VideoOff } from "lucide-react";

interface Detection {
  class: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export function LiveTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  const categoryColors: Record<string, string> = {
    plastic: "#3b82f6",
    metal: "#ef4444",
    paper: "#f59e0b",
    glass: "#10b981",
    cardboard: "#8b5cf6",
    organic: "#22c55e",
    battery: "#eab308",
  };

  const startTracking = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsTracking(true);
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          if (canvasRef.current && videoRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            processFrame();
          }
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const stopTracking = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsTracking(false);
    setDetections([]);
  };

  const processFrame = async () => {
    if (!isTracking || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx || video.readyState !== 4) {
      animationRef.current = requestAnimationFrame(processFrame);
      return;
    }

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Send frame to backend every 500ms (adjust for performance)
    if (!isProcessing) {
      setIsProcessing(true);
      
      try {
        const frameData = canvas.toDataURL("image/jpeg", 0.8);
        
        const response = await fetch("http://localhost:5000/classify-frame", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ frame: frameData }),
        });

        if (response.ok) {
          const data = await response.json();
          setDetections(data.detections || []);
        }
      } catch (error) {
        console.error("Error processing frame:", error);
      } finally {
        setIsProcessing(false);
      }
    }

    // Draw detections on canvas
    drawDetections(ctx, canvas);

    // Continue processing
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(processFrame);
    }, 500); // Process every 500ms
  };

  const drawDetections = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    detections.forEach((det) => {
      const [x1, y1, x2, y2] = det.bbox;
      const categoryLower = det.class.toLowerCase();
      const color = categoryColors[categoryLower] || "#3b82f6";

      // Draw bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

      // Draw label background
      const label = `${det.class} ${(det.confidence * 100).toFixed(0)}%`;
      ctx.font = "16px Arial";
      const textWidth = ctx.measureText(label).width;
      
      ctx.fillStyle = color;
      ctx.fillRect(x1, y1 - 25, textWidth + 10, 25);

      // Draw label text
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, x1 + 5, y1 - 7);
    });
  };

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Live AI Tracking</h2>
          <p className="text-muted-foreground">
            Real-time waste detection and classification using your webcam
          </p>
        </div>

        <div className="space-y-4">
          {!isTracking ? (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-lg">
              <Video className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Start live tracking to detect waste in real-time
              </p>
              <Button onClick={startTracking} size="lg">
                <Camera className="w-4 h-4 mr-2" />
                Start Live Tracking
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain hidden"
                />
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain"
                />
                
                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium">LIVE</span>
                </div>

                {/* Processing indicator */}
                {isProcessing && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                )}

                {/* Stop button */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-4 right-4"
                  onClick={stopTracking}
                >
                  <VideoOff className="w-4 h-4" />
                </Button>
              </div>

              {/* Detection info */}
              {detections.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {detections.map((det, idx) => (
                    <Card key={idx} className="p-3">
                      <div
                        className="w-full h-1 rounded-full mb-2"
                        style={{
                          backgroundColor:
                            categoryColors[det.class.toLowerCase()] || "#3b82f6",
                        }}
                      />
                      <p className="font-medium text-sm">{det.class}</p>
                      <p className="text-xs text-muted-foreground">
                        {(det.confidence * 100).toFixed(0)}% confidence
                      </p>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-sm text-muted-foreground text-center">
                {detections.length === 0
                  ? "No waste detected - point camera at waste items"
                  : `Detecting ${detections.length} item${detections.length > 1 ? "s" : ""}`}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Click "Start Live Tracking" to activate your webcam</li>
          <li>Point the camera at waste items</li>
          <li>AI will detect and classify items in real-time</li>
          <li>Bounding boxes show detected objects with labels</li>
          <li>Click the stop button when finished</li>
        </ul>
      </Card>
    </div>
  );
}
