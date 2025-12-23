"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { ClassificationResult } from "./classification-result";
import Image from "next/image";

export function ClassifyInterface() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleCapture = async () => {
  //   if (!isCameraActive && videoRef.current) {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: { width: 1280, height: 720 },
  //       });
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.play();
  //       setIsCameraActive(true);
  //     } catch (err) {
  //       console.error("Error accessing camera:", err);
  //       alert("Could not access camera. Please check permissions.");
  //     }
  //   } else if (videoRef.current && isCameraActive) {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = videoRef.current.videoWidth;
  //     canvas.height = videoRef.current.videoHeight;
  //     const ctx = canvas.getContext("2d");
  //     ctx?.drawImage(videoRef.current, 0, 0);

  //     const imageDataUrl = canvas.toDataURL("image/jpeg");
  //     setSelectedImage(imageDataUrl);

  //     const stream = videoRef.current.srcObject as MediaStream;
  //     stream?.getTracks().forEach((track) => track.stop());
  //     setIsCameraActive(false);
  //     setResult(null);

  //     // Automatically classify the captured image
  //     setTimeout(() => {
  //       handleClassify();
  //     }, 100);
  //   }
  // };

  const handleClassify = async () => {
    if (!selectedImage) return;

    setIsLoading(true);

    try {
      // Convert dataURL to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      // Send to Flask backend
      const apiResponse = await fetch("http://localhost:5000/classify", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to classify image");
      }

      const data = await apiResponse.json();

      // Check if detections were found
      if (!data.detections || data.detections.length === 0) {
        alert("No waste detected in the image. Please try another image.");
        setIsLoading(false);
        return;
      }

      // Assign colors to categories consistently
      const categoryColors: Record<string, string> = {
        plastic: "text-chart-1",
        metal: "text-chart-2",
        paper: "text-chart-3",
        glass: "text-chart-4",
        cardboard: "text-chart-5",
        organic: "text-green-500",
        battery: "text-yellow-500",
      };

      // Process detections from Flask backend
      const results = data.detections.map((det: any) => {
        const categoryLower = det.class.toLowerCase();
        return {
          category: det.class,
          confidence: det.confidence,
          color: categoryColors[categoryLower] || "text-chart-1",
        };
      });

      // Find primary category (highest confidence)
      const primary = results.reduce((prev: any, current: any) =>
        prev.confidence > current.confidence ? prev : current
      );

      setResult({
        primaryCategory: primary.category,
        confidence: primary.confidence,
        allResults: results,
        disposalTip: getDisposalTip(primary.category),
      });
    } catch (error) {
      console.error("Error classifying image:", error);
      alert(
        "Failed to classify image. Please make sure the Flask backend is running on http://localhost:5000"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDisposalTip = (category: string) => {
    const categoryLower = category.toLowerCase();
    const tips: Record<string, string> = {
      plastic:
        "Rinse the plastic container before recycling to avoid contamination.",
      organic:
        "Compost this organic waste to create nutrient-rich soil for plants.",
      paper: "Keep paper dry and clean for better recycling quality.",
      metal: "Remove any non-metal parts before recycling metal items.",
      glass:
        "Rinse glass containers and remove lids before placing in recycling.",
      cardboard:
        "Flatten cardboard boxes to save space and keep them dry for recycling.",
      battery:
        "Take batteries to designated collection points. Never throw in regular trash.",
    };
    return (
      tips[categoryLower] ||
      "Dispose according to local waste management guidelines."
    );
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8">
        {!selectedImage ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-lg">
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Upload an image</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex gap-3">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                {/* <Button variant="outline" onClick={handleCapture}>
                  <Camera className="w-4 h-4 mr-2" />
                  Use Camera
                </Button> */}
              </div>
            </div>
          </div>
        ) : (
          // : isCameraActive ? (
          //   <div className="space-y-4">
          //     <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          //       <video
          //         ref={videoRef}
          //         autoPlay
          //         playsInline
          //         className="w-full h-full object-cover"
          //       />
          //       {/* Live indicator */}
          //       <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full shadow-lg">
          //         <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          //         <span className="text-sm font-medium">LIVE</span>
          //       </div>
          //     </div>
          //     <div className="flex gap-3 justify-center">
          //       {/* <Button onClick={handleCapture} size="lg">
          //         <Camera className="w-4 h-4 mr-2" />
          //         Capture & Classify
          //       </Button> */}
          //       <Button
          //         variant="outline"
          //         onClick={() => {
          //           const stream = videoRef.current?.srcObject as MediaStream;
          //           stream?.getTracks().forEach((track) => track.stop());
          //           setIsCameraActive(false);
          //         }}
          //       >
          //         Cancel
          //       </Button>
          //     </div>
          //     <p className="text-sm text-muted-foreground text-center">
          //       Position the waste item in frame and click capture to take photo
          //       and classify
          //     </p>
          //   </div>
          // )
          <div className="space-y-4">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Selected waste"
                fill
                className="object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleReset}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {!result && (
              <Button
                className="w-full"
                size="lg"
                onClick={handleClassify}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Classify Waste"
                )}
              </Button>
            )}
          </div>
        )}
      </Card>

      {result && <ClassificationResult result={result} onReset={handleReset} />}
    </div>
  );
}
