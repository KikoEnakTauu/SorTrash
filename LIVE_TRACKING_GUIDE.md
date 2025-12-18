# Quick Start Guide - SorTrash Live Tracking

## ✅ Live Tracking Configured!

Your SorTrash app now has complete live tracking integration between Flask backend and Next.js frontend.

## What's New

### Backend (Flask)
- ✅ Automatic history tracking for every classification
- ✅ `/stats` endpoint for dashboard statistics
- ✅ `/history` endpoint for complete history
- ✅ `/clear-history` endpoint to reset data
- ✅ JSON-based persistent storage (`classification_history.json`)
- ✅ Real-time statistics calculation (total scans, weekly activity, categories)

### Frontend (Dashboard)
- ✅ Live statistics display
- ✅ Auto-refresh every 30 seconds
- ✅ Manual refresh button
- ✅ Category distribution with visual progress bars
- ✅ Recent classifications with timestamps
- ✅ Environmental impact calculator
- ✅ Loading states and error handling

## How to Test

### Step 1: Start Backend
```bash
cd backend
python app.py
```

You should see:
```
Loading models...
Models loaded!
 * Running on http://0.0.0.0:5000
```

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000
```

### Step 3: Test the Flow

1. **Go to Classify Page**: http://localhost:3000/classify
   - Upload an image of waste
   - Click "Classify Waste"
   - See the results

2. **Check Dashboard**: http://localhost:3000/dashboard
   - See your total scans
   - View category distribution
   - Check recent classifications
   - Monitor environmental impact

3. **Watch Live Updates**:
   - Classify more images
   - Click refresh on dashboard or wait 30 seconds
   - See statistics update in real-time

## Test with Sample Data

If you don't have images yet, create sample data:

```bash
cd backend
python test_api.py
```

This creates a `classification_history.json` with sample classifications. Refresh your dashboard to see it!

## API Testing with curl

Test endpoints directly:

```bash
# Get statistics
curl http://localhost:5000/stats

# Get history
curl http://localhost:5000/history

# Clear history
curl -X DELETE http://localhost:5000/clear-history
```

## Data Flow

```
User uploads image
    ↓
Frontend sends to /classify
    ↓
Backend runs YOLO detection + classification
    ↓
Results saved to classification_history.json
    ↓
Frontend displays results
    ↓
User visits dashboard
    ↓
Frontend fetches /stats
    ↓
Backend calculates statistics from history
    ↓
Dashboard shows live data
```

## Files to Check

- **Backend**: `d:\Projectt\SorTrash\backend\app.py` (Updated with tracking)
- **Frontend Dashboard**: `d:\Projectt\SorTrash\frontend\components\dashboard-content.tsx` (Live updates)
- **History Storage**: `d:\Projectt\SorTrash\backend\classification_history.json` (Auto-created)

## Troubleshooting

**Dashboard shows "Loading..." forever**
- Check if Flask backend is running on port 5000
- Check browser console for CORS errors
- Verify Flask-CORS is installed

**No statistics showing**
- Make at least one classification first
- Check `classification_history.json` exists in backend folder
- Click the refresh button on dashboard

**"Failed to fetch statistics" error**
- Restart Flask backend
- Check terminal for Python errors
- Verify `/stats` endpoint: http://localhost:5000/stats

## Next Steps

1. Add your YOLO models (`best_detector.pt`, `best_classifier.pt`)
2. Test with real waste images
3. Monitor the live tracking dashboard
4. Customize environmental impact calculations
5. Add more waste categories as needed

Enjoy your live-tracked waste classification app! 🌍♻️
