import React from 'react';
import { MDBContainer } from 'mdbreact';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarController, BarElement);

function StatisticCards() {
  const data = {
    labels: ["AL01", "AL02", "AL03", "AL04", "AL05", "AL06", "AL07"],
    datasets: [
      {
        label: "Hours Studied in Geeksforgeeks",
        data: [2, 5, 6, 7, 3, 3, 4],
        backgroundColor: "#02b844",
        borderWidth: 1,
        borderColor: "#000000",
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Use 'category' scale for the X-axis
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const cardTextStyle = {
    color: 'white', // Set the text color to white
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Lines</h5>
              <p className="card-text" style={cardTextStyle}>10</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Designs</h5>
              <p className="card-text" style={cardTextStyle}>5</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Average SMV</h5>
              <p className="card-text" style={cardTextStyle}>45%</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Defects</h5>
              <p className="card-text" style={cardTextStyle}>34</p>
            </div>
          </div>
        </div>

        <MDBContainer>
          <Bar data={data} options={options} style={{ maxHeight: '400px' }} />
        </MDBContainer>
      </div>
    </div>
  );
}

export default StatisticCards;
