from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load YOLO model (you can change the model path if needed)
model = YOLO('yolov8n.pt')  # Using nano model for speed, change to yolov8s.pt or others as needed

@app.route('/classify', methods=['POST'])
def classify():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        # Read image
        image = Image.open(io.BytesIO(file.read()))
        image_np = np.array(image)
        
        # Run YOLO inference
        results = model(image_np)
        
        # Process results
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                detection = {
                    'class': model.names[int(box.cls.item())],
                    'confidence': float(box.conf.item()),
                    'bbox': box.xyxy.tolist()[0]  # [x1, y1, x2, y2]
                }
                detections.append(detection)
        
        return jsonify({'detections': detections})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)