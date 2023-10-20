import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Addline() {
  const [formData, setFormData] = useState({
    productionLines: '',
    maxSMV: '',
    minSMV: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [errors, setErrors] = useState({
    productionLines: '',
    maxSMV: '',
    minSMV: '',
  });

  const validateForm = () => {
    const newErrors = { ...errors };

    if (!formData.productionLines) {
      newErrors.productionLines = 'Production Lines is required';
    }

    if (!formData.maxSMV) {
      newErrors.maxSMV = 'Max SMV is required';
    }

    if (!formData.minSMV) {
      newErrors.minSMV = 'Min SMV is required';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post('http://localhost:8081/addProductionLine', formData) // Update the API endpoint
        .then((res) => {
          if (res.data.Status === 'Success') {
            console.log('Data submitted successfully.');
            Swal.fire('Success', 'Data submitted successfully.', 'success').then(() => {
            //   navigate('/users');
              Swal.fire('Thank You', 'Your form has been submitted. You will now be redirected to the Users page.', 'info');
            });
          } else {
            console.log('Error:', res.data.Error);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log('Server Error:', err.response.data);
          } else {
            console.log('An error occurred:', err.message);
          }
        });
    } else {
      console.log('Form has errors. Please check.');
    }
  };

  return (
    <div className="container-fluid mt-5 add-users">
      <h1 className="text-center">Add Production lines</h1>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2>Production line details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Production Line</label>
              <input type="text" className="form-control" name="productionLines" value={formData.productionLines} onChange={handleChange} />
              {errors.productionLines && <span className="error-text">{errors.productionLines}</span>}
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Max SMV</label>
                  <input type="number" className="form-control" name="maxSMV" value={formData.maxSMV} onChange={handleChange} />
                  {errors.maxSMV && <span className="error-text">{errors.maxSMV}</span>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Min SMV</label>
                  <input type="number" className="form-control" name="minSMV" value={formData.minSMV} onChange={handleChange} />
                  {errors.minSMV && <span className="error-text">{errors.minSMV}</span>}
                </div>
              </div>
            </div>
            <div className="mt-3 mb-4 text-right">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addline;
