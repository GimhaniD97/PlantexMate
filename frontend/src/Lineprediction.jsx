import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Lineprediction() {
  const [selectedDesign, setSelectedDesign] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [designOptions, setDesignOptions] = useState([]);

  useEffect(() => {
    // Fetch the available design options from your API
    axios
      .get('http://localhost:8081/api/uniqueProductTypes', { withCredentials: true })
      .then(response => {
        setDesignOptions(response.data.UniqueProductTypes);
      })
      .catch(error => {
        console.error('Design Options Error:', error);
      });
  }, []);

  const handlePredict = () => {
    // Make a POST request to the Flask API to get the prediction result based on the selected design
    axios
      .post('http://127.0.0.1:5000/predict', { STYLE: selectedDesign }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        setPredictionResult(response.data);
      })
      .catch(error => {
        console.error('Prediction Error:', error);
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
              {designOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
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
      {predictionResult && (
  <div className="mt-4">
    <h3>Prediction Result:</h3>
    <p>
      <strong>Best Factory:</strong> {predictionResult['Predicted Best Factory']}
    </p>
    <p>
      <strong>Predicted Team:</strong> {predictionResult['Predicted Team']}
    </p>
    <p>
      <strong>Most common defect type:</strong> {predictionResult['Predicted Most Common Defect']}
    </p>
    
    <p>
      {/* <strong>STYLE:</strong> {predictionResult['STYLE']} */}
    </p>
  </div>
)}

    </div>
  );
}

export default Lineprediction;
