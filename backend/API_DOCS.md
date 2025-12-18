# Backend - Flask API with YOLO

This is the Flask backend for the waste classification app using YOLO with live tracking.

## Setup

1. Install Python dependencies:
   ```bash
   pip install Flask==2.2.5 Flask-CORS==4.0.0 ultralytics opencv-python numpy Pillow
   ```

2. Place your YOLO model files in the backend folder:
   - `best_detector.pt` - Detects waste objects in images
   - `best_classifier.pt` - Classifies waste types

3. Run the Flask app:
   ```bash
   python app.py
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### POST /classify
Accepts an image file and returns YOLO detections. Automatically saves to history.

**Request:** FormData with 'file' key containing the image.

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
Returns dashboard statistics including total scans, weekly scans, category distribution, and recent classifications.

**Response:**
```json
{
  "totalScans": 127,
  "thisWeek": 23,
  "mostCommon": "plastic",
  "categoryDistribution": [
    {"category": "plastic", "count": 45},
    {"category": "metal", "count": 38}
  ],
  "recentClassifications": [...]
}
```

### GET /history
Returns complete classification history.

**Response:**
```json
{
  "history": [
    {
      "id": 1,
      "category": "plastic",
      "confidence": 0.92,
      "date": "2024-12-18T10:30:00",
      "timestamp": 1734518400.0
    }
  ]
}
```

### DELETE /clear-history
Clears all classification history.

**Response:**
```json
{
  "message": "History cleared successfully"
}
```

## Features

- ✅ Two-stage YOLO detection and classification
- ✅ Automatic history tracking with JSON storage
- ✅ Real-time statistics calculation
- ✅ Category distribution analysis
- ✅ Weekly activity tracking
- ✅ CORS enabled for frontend integration

## Testing

Run the test script to create sample data:
```bash
python test_api.py
```

This will create a sample `classification_history.json` file with test data.

## Data Storage

Classification history is stored in `classification_history.json` in the backend directory. The file is automatically created when the first classification is made.
