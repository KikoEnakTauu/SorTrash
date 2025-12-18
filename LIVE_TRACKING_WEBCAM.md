# 🎥 Live AI Tracking Setup - Real-time Webcam Detection

## What's New

You now have **real-time AI tracking** using your webcam! The YOLO model continuously detects and classifies waste items as they appear in the camera feed.

## Features

✅ **Live Video Processing** - Continuous frame analysis from webcam  
✅ **Real-time Bounding Boxes** - Visual detection boxes drawn on live feed  
✅ **Category Labels** - Shows waste type and confidence in real-time  
✅ **Color-coded Detection** - Different colors for each waste category  
✅ **Performance Optimized** - Processes frames every 500ms for smooth performance  
✅ **No History Spam** - Only saves to history when you capture, not during tracking  

## Quick Start

### 1. Start Backend
```bash
cd backend
python app.py
```

The backend now includes the `/classify-frame` endpoint for real-time processing.

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

### 3. Access Live Tracking
Navigate to: **http://localhost:3000/live-tracking**

Or click the "Live Tracking" link in the navigation menu.

## How It Works

### Backend Processing Flow
```
Webcam Frame (640x480)
    ↓
Frontend captures canvas frame
    ↓
Converts to base64 JPEG
    ↓
POST /classify-frame
    ↓
YOLO Detector finds objects
    ↓
YOLO Classifier identifies types
    ↓
Returns detections with bboxes
    ↓
Frontend draws boxes on canvas
    ↓
Repeat every 500ms
```

### Frontend Components

**live-tracking.tsx** - Main component
- Manages webcam stream
- Captures video frames to canvas
- Sends frames to backend
- Draws bounding boxes and labels
- Handles start/stop controls

**live-tracking/page.tsx** - Page wrapper
- Navigation header
- Layout structure

## Usage Instructions

1. **Click "Start Live Tracking"**
   - Grants camera permissions
   - Activates webcam feed

2. **Point camera at waste items**
   - AI detects objects automatically
   - Bounding boxes appear around items
   - Labels show category and confidence

3. **View detection info**
   - Cards below show all detected items
   - Color-coded by category
   - Live count of detected items

4. **Stop tracking**
   - Click red stop button
   - Webcam turns off
   - Detection stops

## Performance Settings

Located in [live-tracking.tsx](d:\Projectt\SorTrash\frontend\components\live-tracking.tsx):

```typescript
// Process frames every 500ms (2 FPS)
setTimeout(() => {
  animationRef.current = requestAnimationFrame(processFrame);
}, 500);

// JPEG quality (0.8 = 80%)
const frameData = canvas.toDataURL("image/jpeg", 0.8);
```

**Adjust for your needs:**
- Lower delay (e.g., 300ms) = faster but more CPU
- Higher delay (e.g., 1000ms) = slower but less CPU
- Lower quality (e.g., 0.6) = faster upload
- Higher quality (e.g., 0.9) = better accuracy

## Backend Configuration

Located in [app.py](d:\Projectt\SorTrash\backend\app.py):

```python
@app.route('/classify-frame', methods=['POST'])
def classify_frame():
    # Detection confidence threshold
    det_results = detector(img, conf=0.4)  # 40% confidence
    
    # Classification confidence threshold
    cls_results = classifier.predict(conf=0.25)  # 25% confidence
```

**Adjust thresholds:**
- Higher = fewer false positives, might miss some items
- Lower = more detections, might have false positives

## Category Colors

Defined in live-tracking.tsx:

```typescript
const categoryColors = {
  plastic: "#3b82f6",   // Blue
  metal: "#ef4444",     // Red
  paper: "#f59e0b",     // Orange
  glass: "#10b981",     // Green
  cardboard: "#8b5cf6", // Purple
  organic: "#22c55e",   // Light green
  battery: "#eab308",   // Yellow
};
```

## Troubleshooting

### Camera Permission Denied
- Allow camera access in browser settings
- Check if another app is using the camera
- Try a different browser

### Slow Performance
- Increase frame delay (e.g., 1000ms)
- Reduce JPEG quality (e.g., 0.6)
- Close other browser tabs
- Check backend isn't overloaded

### No Detections Showing
- Ensure good lighting
- Move waste item closer to camera
- Try different angles
- Adjust confidence thresholds

### Bounding Boxes Not Appearing
- Check browser console for errors
- Verify backend is running
- Check `/classify-frame` endpoint response
- Ensure canvas is rendering

## API Endpoint

### POST /classify-frame

**Request:**
```json
{
  "frame": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**
```json
{
  "detections": [
    {
      "class": "plastic",
      "confidence": 0.92,
      "bbox": [120, 85, 340, 280]
    }
  ]
}
```

**Note:** This endpoint does NOT save to history. Only the `/classify` endpoint saves classifications.

## Tips for Best Results

1. **Good Lighting** - Ensure area is well-lit
2. **Clear Background** - Less clutter = better detection
3. **Item Distance** - Keep items 1-2 feet from camera
4. **Stable Position** - Hold camera steady
5. **Single Items** - Works best with one item at a time
6. **Contrast** - Dark items on light background (or vice versa)

## Next Steps

- Test with different waste types
- Adjust performance settings for your hardware
- Customize category colors
- Add sound alerts for detections
- Save specific detections to history with a "Capture" button

Enjoy real-time waste detection! 🎥♻️
