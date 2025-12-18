# SorTrash - Waste Classification App Setup Guide

## Features

✅ **Image Classification** - Upload or capture photos for instant waste categorization  
✅ **Live AI Tracking** - Real-time webcam detection with bounding boxes  
✅ **Auto History Tracking** - Every classification is automatically saved  
✅ **Dashboard Analytics** - View statistics and environmental impact  
✅ **YOLO Two-Stage Pipeline** - Detection + Classification for accuracy  

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Your YOLO model files: `best_detector.pt` and `best_classifier.pt`

## Backend Setup (Flask)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Place your YOLO model files in the backend folder:
   - `best_detector.pt` - Detects WHERE the trash is in the image
   - `best_classifier.pt` - Classifies WHAT TYPE of trash it is

3. Install Python dependencies:
   ```bash
   pip install Flask==2.2.5 Flask-CORS==4.0.0 ultralytics opencv-python numpy Pillow
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

   The backend will start on `http://localhost:5000`

## Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## Usage

### Image Classification
1. Navigate to **Classify** page
2. Upload an image or use camera
3. Click "Classify Waste" to analyze
4. View results and disposal tips

### Live AI Tracking
1. Navigate to **Live Tracking** page
2. Click "Start Live Tracking"
3. Point webcam at waste items
### Real-time Webcam Detection
- **Continuous Processing** - Analyzes video frames every 500ms
- **Bounding Boxes** - Visual boxes around detected items
- **Live Labels** - Shows category and confidence in real-time
- **Color Coding** - Different colors for each waste type
- **Performance Optimized** - Adjustable frame rate for your hardware

### Dashboard Analytics (Auto-updating)
5. View category labels and confidence scores

### Dashboard
1. Navigate to **Dashboard** page
2. View total scans and statistics
3. See category distribution charts
4. Check recent classifications
5. Monitor environmental impact

## Live Tracking Features

The app now includes real-time tracking of your waste classification activity:

- **Auto-save**: Every classification is automatically saved to history
- **Dashboard Stats**: View total scans, weekly activity, and most common categories
- **Category Distribution**: See visual breakdown of waste types you've classified
- **Recent Classifications**: Track your last 10 classifications with timestamps
- **Environmental Impact**: See calculated CO₂ savings and environmental benefits
- **Auto-refresh**: Dashboard updates every 30 seconds automatically

## API Endpoints

### POST /classify

Accepts an image file and returns detected waste categories. Automatically saves to history.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with 'file' key containing the image

**Response:**
```json
{
  "detections": [
    {
      "class": "plastic",
      "confidence": 0.92,
      "bbox": [x1, y1, x2, y2]
    }
  ]
}
```

### GET /stats

Returns dashboard statistics.

**Response:**
```json
{
  "totalScans": 127,
  "thisWeek": 23,
  "mostCommon": "plastic",
  "categoryDistribution": [...],
  "recentClassifications": [...]
}
```

### GET /history

Returns complete classification history.

### DELETE /clear-history

Clears all saved classification history.

## Troubleshooting

- **CORS errors**: Make sure Flask-CORS is installed and the backend is running
- **Connection refused**: Verify the Flask server is running on port 5000
- **No detections**: Try adjusting the confidence threshold in app.py (currently 0.4 for detector, 0.25 for classifier)
- **Model not found**: Ensure both `.pt` files are in the backend directory
