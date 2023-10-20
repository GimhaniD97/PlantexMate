import React, { useState } from 'react';
import axios from 'axios';

function Lineprediction() {
  const [selectedDesign, setSelectedDesign] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredict = () => {
    // console.log('design',selectedDesign);

    // Make a POST request to the Flask API to get the prediction result based on the selected design
    axios
    .post('http://127.0.0.1:5000/predict', { product_type: selectedDesign }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
    .then(response => {
        console.log('Prediction Result:', response.data);
        // Update the prediction result state with the API response
        setPredictionResult(response.data);
      })
      .catch(error => {
        console.error('Prediction Error:', error);
        // Handle the error here (e.g., show an error message)
      });
  };

  return (
    <div className="container mt-4 add-users">
      <h2>Predict the best production line for your design</h2>
      <div className="section">
        <div className="row">
          <div className="col-md-6">
            <select
              className="form-control mt-4"
              value={selectedDesign}
              onChange={e => setSelectedDesign(e.target.value)}
            >
              <option value="">Select your design</option>
              <option value="Hoody Baselayer">Hoody Baselayer</option>
              <option value="T-shirt Baselayer">T-shirt Baselayer</option>
              <option value="T-shirt">T-shirt</option>
              {/* Add more design options here as needed */}
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-3 text-end">
        <div className="col-md-6">
          <button className="btn btn-success" onClick={handlePredict}>
            Submit
          </button>
        </div>
      </div>
      {/* Display the prediction result */}
      {predictionResult && (
        <div className="mt-4">
          <h3>Prediction Result:</h3>
          <p>
            <strong>Best production line:</strong> {predictionResult.predicted_module}
          </p>
          <p>
            <strong>Most defect type:</strong>Condition of Carton/Inner
          </p>
          <p>
            <strong>Max SMV:</strong> {predictionResult.max_smv}
          </p>
          <p>
            <strong>Min SMV:</strong> {predictionResult.min_smv}
          </p>
        </div>
      )}
    </div>
  );
}

export default Lineprediction;
