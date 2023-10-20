import React, { useEffect, useState } from 'react';
import { MDBContainer } from 'mdbreact';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, Title, Tooltip, Legend } from 'chart.js/auto';
import Papa from 'papaparse';

Chart.register(CategoryScale, LinearScale, LineController, Title, Tooltip, Legend);

function LineChartFromDatabase() {
  const [selectedModule, setSelectedModule] = useState(''); // Default module
  const [moduleOptions, setModuleOptions] = useState([]); // Module options for the dropdown
  const [defectData, setDefectData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Defect Rate',
        data: [],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  });

  const [rejectData, setRejectData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Reject Qty',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 99, 71, 1)', // Red color
      },
    ],
  });

  const [missingData, setMissingData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Missing Qty',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 215, 0, 1)', // Gold color
      },
    ],
  });

  // Fetch the list of modules from the API
  useEffect(() => {
    async function fetchModuleOptions() {
      try {
        const response = await fetch('http://localhost:8081/api/uniqueModules'); // Replace with your server endpoint
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const moduleData = await response.json();
        setModuleOptions(moduleData.UniqueModules);
      } catch (error) {
        console.error('Error fetching module options:', error);
      }
    }

    fetchModuleOptions();
  }, []);

  // Fetch data for the selected module
  useEffect(() => {
    async function fetchDataFromDatabase() {
      try {
        const response = await fetch('http://localhost:8081/api/data'); // Replace with your server endpoint
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        const databaseData = await response.json();

        // Extract the necessary data from the response for the selected module
        const filteredData = databaseData.filter((item) => item.Module === selectedModule);
        const productTypes = filteredData.map((item) => item['Product Type']);
        const defectRates = filteredData.map((item) => item['Defect Qty']);
        const rejectQty = filteredData.map((item) => item['Reject Qty']);
        const missingQty = filteredData.map((item) => item['Missing Qty']);

        setDefectData({
          labels: productTypes, // Use Product Types as x-axis labels
          datasets: [
            {
              label: 'Defect Rate',
              data: defectRates,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        });

        setRejectData({
          labels: productTypes, // Use Product Types as x-axis labels
          datasets: [
            {
              label: 'Reject Qty',
              data: rejectQty,
              fill: false,
              borderColor: 'rgba(255, 99, 71, 1)',
            },
          ],
        });

        setMissingData({
          labels: productTypes, // Use Product Types as x-axis labels
          datasets: [
            {
              label: 'Missing Qty',
              data: missingQty,
              fill: false,
              borderColor: 'rgba(255, 215, 0, 1)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    }

    if (selectedModule) {
      fetchDataFromDatabase();
    }
  }, [selectedModule]);

  // Event handler for module selection
  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  const cardTextStyle = {
    color: 'white', // Set the text color to white
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Lines</h5>
              <p className="card-text" style={cardTextStyle}>10</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Designs</h5>
              <p className="card-text" style={cardTextStyle}>20</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h4>Select Production Line</h4>
          {/* Dropdown to select a module */}
          <select value={selectedModule} onChange={handleModuleChange}>
            <option value="" disabled>Select Production Line</option>
            {moduleOptions.map((module, index) => (
              <option key={index} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <MDBContainer style={{ width: '100%', height: '500px' }}>
              <Line data={defectData} />
            </MDBContainer>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <MDBContainer style={{ width: '100%', height: '500px' }}>
              <Line data={rejectData} />
            </MDBContainer>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <MDBContainer style={{ width: '100%', height: '500px' }}>
              <Line data={missingData} />
            </MDBContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineChartFromDatabase;
