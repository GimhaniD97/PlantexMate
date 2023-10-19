import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function Prediction() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [csvFile, setCsvFile] = useState(null);

  // Mock data for select options
  const provinces = ['Central', 'North Central', 'Northern','Eastern','North Western','Southern','Uva','Sabaragamuwa','Western'];
  const districts = ['District X', 'District Y', 'District Z'];
  const divisions = ['Division 1', 'Division 2', 'Division 3'];
  const stations = ['Station A', 'Station B', 'Station C'];

  const handleCsvFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleUpload = () => {
    // Handle the upload logic here
    console.log('Upload button clicked');
    console.log('Selected Province:', selectedProvince);
    console.log('Selected District:', selectedDistrict);
    console.log('Selected Division:', selectedDivision);
    console.log('Selected Station:', selectedStation);
    console.log('CSV File:', csvFile);
  };

  const [predictionResult, setPredictionResult] = useState(null);


  const handlePredict = () => {
    // Create a FormData object to send the CSV file
    const formData = new FormData();
    formData.append('file', csvFile);

    // Make a POST request to the Flask API
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        console.log('Prediction Result:', response.data);
        // Handle the prediction result here (e.g., display the result)
        setPredictionResult(response.data);

      })
      .catch(error => {
        console.error('Prediction Error:', error);
        // Handle the error here (e.g., show an error message)
      });
  };

  return (
    <div className="container mt-4">
      <h2>Prediction Upload</h2>
      <div className="section">
        <h4>Location Details</h4>
        <div className="row">
          <div className="col-md-6">
            <label>Select Province:</label>
            <select className="form-control" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
              <option value="">Select</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>Select District:</label>
            <select className="form-control" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
              <option value="">Select</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label>Select Polling Division:</label>
            <select className="form-control" value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
              <option value="">Select</option>
              {divisions.map((division, index) => (
                <option key={index} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>Select Polling Station:</label>
            <select className="form-control" value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)}>
              <option value="">Select</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="section mt-3">
        <h4>Upload CSV File</h4>
        <div className="row">
          <div className="col-md-6">
            <label>Choose a CSV file:</label>
            <input type="file" className="form-control-file" accept=".csv" onChange={handleCsvFileChange} />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-success" onClick={handlePredict}>
            Predict
          </button>
        </div>
        {/* Display the prediction result */}
      {predictionResult && (
        <div className="mt-3">
          <h4 className="mb-3">Prediction Result</h4>
          {Object.keys(predictionResult).map(position => (
            <div key={position}>
              <h5>{position}</h5>
              <ul>
                {predictionResult[position].map(name => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default Prediction;
