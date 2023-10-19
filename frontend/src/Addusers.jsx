import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Addusers.css'; // Make sure to adjust the path if needed

function Addusers() {

const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    nic: '',
    age: '',
    eduLevel: '',
    gender: '',
    currentCity: '',
    pollingStation: '',
    province: '',
    district: '',
    pollingDivision: '',
    currentPosition: '',
    experience: '',
    currentSalary: '',
    positionType:'',
    institutionName: '',
    famName:'',
    famStation:''
  });

  const navigate=useNavigate();

const handleChange = (e) => {
   const { name, value, type, checked } = e.target;

   if (type === 'checkbox') {
     setFormData((prevData) => ({
       ...prevData,
       [name]: checked,
     }));
   } else {
     setFormData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', 
    }));
  };

  const [errors, setErrors] = useState({
   fullName: '',
   dob: '',
   email: '',
   nic: '',
   age: '',
   eduLevel: '',
   gender: '',
   currentCity: '',
   pollingStation: '',
   province: '',
   district: '',
   pollingDivision: '',
   currentPosition: '',
   experience: '',
   currentSalary: '',
   positionType: '',
   institutionName: '',
   famName:'',
   famStation:''
 });
 
 const isValidEmail = (email) => {
   // Basic email validation regex
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
 };

  const validateForm = () => {
   const newErrors = { ...errors };
 
   // Validate required fields
   if (!formData.fullName) {
     newErrors.fullName = 'Full Name is required';
   }
 
   if (!formData.dob) {
     newErrors.dob = 'Date of Birth is required';
   }
 
   if (!formData.email) {
     newErrors.email = 'Email is required';
   } else if (!isValidEmail(formData.email)) {
     newErrors.email = 'Invalid email format';
   }
 
   // Add more validation rules for other fields
   if (!formData.nic) {
     newErrors.nic = 'NIC is required';
   }
 
   if (!formData.age) {
     newErrors.age = 'Age is required';
   }
 
   if (!formData.eduLevel) {
     newErrors.eduLevel = 'Educational Level is required';
   }
 
   if (!formData.gender) {
     newErrors.gender = 'Gender is required';
   }
 
   if (!formData.currentCity) {
     newErrors.currentCity = 'Current City is required';
   }
 
   if (!formData.province) {
     newErrors.province = 'Province is required';
   }
 
   if (!formData.district) {
     newErrors.district = 'District is required';
   }
 
   if (!formData.pollingDivision) {
     newErrors.pollingDivision = 'Polling Division is required';
   }
 
   if (!formData.pollingStation) {
     newErrors.pollingStation = 'Polling Station is required';
   }
 
   if (!formData.currentPosition) {
     newErrors.currentPosition = 'Current Position is required';
   }
 
   if (!formData.experience) {
     newErrors.experience = 'Experience is required';
   }
 
   if (!formData.currentSalary) {
     newErrors.currentSalary = 'Current Salary is required';
   }
 
   if (!formData.institutionName) {
     newErrors.institutionName = 'Institution Name is required';
   }
 
   if (!formData.positionType) {
     newErrors.positionType = 'Position Type is required';
   }

   if (!formData.famName) {
      newErrors.famName = 'Family members are required';
    }

    if (!formData.famStation) {
      newErrors.famStation = 'Family members polling station is required';
    }
 
   setErrors(newErrors);
   return Object.values(newErrors).every((error) => error === '');
 };
 

const [provinces, setProvinces] = useState([
   { id: '1', name: 'Central' },
   { id: '2', name: 'Eastern' },
   { id: '3', name: 'North' },
   { id: '4', name: 'North Central' },
   { id: '5', name: 'North Western' },
   { id: '6', name: 'Sabaragamuwa' },
   { id: '7', name: 'Southern' },
   { id: '8', name: 'Uva' },
   { id: '9', name: 'Western' },
]);
const [districts, setDistricts] = useState([
   { id: '1', name: 'Ampara' },
   { id: '2', name: 'Anuradhapura' },
   { id: '3', name: 'Badulla' },
   { id: '4', name: 'Batticaloa' },
   { id: '5', name: 'Colombo' },
   { id: '6', name: 'Galle' },
   { id: '7', name: 'Gampaha' },
   { id: '8', name: 'Hambantota' },
   { id: '9', name: 'Jaffna' },
   { id: '10', name: 'Kalutara' },
   { id: '11', name: 'Kandy' },
   { id: '12', name: 'Kegalle' },
   { id: '13', name: 'Kilinochchi' },
   { id: '14', name: 'Kurunegala' },
   { id: '15', name: 'Mannar' },
   { id: '16', name: 'Matale' },
   { id: '17', name: 'Matara' },
   { id: '18', name: 'Moneragala' },
   { id: '19', name: 'Mullativu' },
   { id: '20', name: 'Nuwara Eliya' },
   { id: '21', name: 'Polonnaruwa' },
   { id: '22', name: 'Puttlam' },
   { id: '23', name: 'Ratnapura' },
   { id: '24', name: 'Trincomalee' },
   { id: '25', name: 'Vavuniya' },
]);
const [pollingDivisions, setPollingDivisions] = useState([]);


const handleSubmit = (e) => {
   e.preventDefault();

   if (!formData.intimidationThreats && !formData.voterSuppression && !formData.clashesPollingStations && !formData.attackCandidates && !formData.disruptionCampaignEvents) {
      // None of the violent cases checkboxes are checked
      console.log('No violent cases selected. You can submit the form.');
      
      if (validateForm()) {
         axios
           .post('http://localhost:8081/create', formData)
           .then((res) => {
             if (res.data.Status === 'Success') {
               console.log('Data submitted successfully.');
               Swal.fire('Success', 'Data submitted successfully.', 'success').then(() => {
                  navigate('/users');
                  Swal.fire('Thank You', 'Your form has been submitted. You will now be redirected to the Users page.', 'info');
               });
             } else {
               // Handle the error case
               console.log('Error:', res.data.Error);
             }
           })
           .catch((err) => {
             if (err.response) {
               // Handle network or server error
               console.log('Server Error:', err.response.data);
             } else {
               // Handle other types of errors
               console.log('An error occurred:', err.message);
             }
           });
       } else {
         console.log('Form has errors. Please check.');
       }
   } else {
      // At least one violent case checkbox is checked
      Swal.fire('Alert', "Cannot submit the form with violent cases selected. Please uncheck the violent cases checkboxes.", 'warning');
   }
 };

return (
<div className="container-fluid mt-5 add-users">
   <h1 className="text-center">Add Users</h1>
   <div className="row justify-content-center">
      {/* Centering the form */}
      <div className="col-md-10">
         <h2>Private Details</h2>
         <form onSubmit={handleSubmit}>
            <div className="form-group">
               <label>Full Name</label>
               <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
               {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Date of Birth</label>
                     <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                     {errors.dob && <span className="error-text">{errors.dob}</span>}
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Email</label>
                     <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                     {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label>NIC</label>
                     <input type="text" className="form-control" name="nic" value={formData.nic} onChange={handleChange} />
                     {errors.nic && <span className="error-text">{errors.nic}</span>}
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Age</label>
                     <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
                     {errors.age && <span className="error-text">{errors.age}</span>}
                  </div>
               </div>
            </div>
            <div className="form-group">
               <label>Educational Level</label>
               <input type="text" className="form-control" name="eduLevel" value={formData.eduLevel} onChange={handleChange} />
               {errors.eduLevel && <span className="error-text">{errors.eduLevel}</span>}
            </div>
            <div className="form-group">
               <label>Gender</label>
               <div>
                  <label className="form-check-inline">
                  <input type="radio" className="form-check-input" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                  Male
                  </label>
                  <label className="form-check-inline">
                  <input type="radio" className="form-check-input" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                  Female
                  </label>
                  {errors.gender && <span className="error-text">{errors.gender}</span>}

               </div>
            </div>
            <div className="form-group">
               <label>Current City</label>
               <input type="text" className="form-control" name="currentCity" value={formData.currentCity} onChange={handleChange} />
               {errors.currentCity && <span className="error-text">{errors.currentCity}</span>}
            </div>
            <div className="form-group">
               <label>Province</label>
               <select className="form-control" name="province" value={formData.province} onChange={handleChange}>
                  <option value="">Select Province</option>
                  {provinces.map(province => (
                  <option key={province.id} value={province.id}>
                     {province.name}
                  </option>
                  ))}
               </select>
               {errors.province && <span className="error-text">{errors.province}</span>}
            </div>
            <div className="form-group">
               <label>District</label>
               <select className="form-control" name="district" value={formData.district} onChange={handleChange}>
                  <option value="">Select District</option>
                  {districts.map(district => (
                  <option key={district.id} value={district.id}>
                     {district.name}
                  </option>
                  ))}
               </select>
               {errors.district && <span className="error-text">{errors.district}</span>}
            </div>
            <div className="form-group">
               <label>Polling Division</label>
               <input type="text" className="form-control" name="pollingDivision" value={formData.pollingDivision} onChange={handleChange} />
               {errors.pollingDivision && <span className="error-text">{errors.pollingDivision}</span>}
            </div>
            <div className="form-group">
               <label>Polling Station</label>
               <input type="text" className="form-control" name="pollingStation" value={formData.pollingStation} onChange={handleChange} />
               {errors.pollingStation && <span className="error-text">{errors.pollingStation}</span>}
            </div>
            <h2>Service Details</h2>
            <div className="form-group">
               <label>Current Position</label>
               <input
                  type="text"
                  className="form-control"
                  name="currentPosition"
                  value={formData.currentPosition}
                  onChange={handleChange}
                  />
                            {errors.currentPosition && <span className="error-text">{errors.currentPosition}</span>}

            </div>
            <div className="form-group">
               <label>Experience</label>
               <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  />
                            {errors.experience && <span className="error-text">{errors.experience}</span>}

            </div>
            <div className="form-group">
               <label>Current Salary</label>
               <input
                  type="text"
                  className="form-control"
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleChange}
                  />
                            {errors.currentSalary && <span className="error-text">{errors.currentSalary}</span>}

            </div>
            <div className="form-group">
               <label>Name of Institution</label>
               <input
                  type="text"
                  className="form-control"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  />
                            {errors.institutionName && <span className="error-text">{errors.institutionName}</span>}

            </div>
            <div className="form-group">
               <label>Position Type</label>
               <input
                  type="text"
                  className="form-control"
                  name="positionType"
                  value={formData.positionType}
                  onChange={handleChange}
                  />
                            {errors.positionType && <span className="error-text">{errors.positionType}</span>}

            </div>
            <h2>Service Details</h2>
            <div className="form-group">
               <label>Family Members Names</label>
               <input
                  type="text"
                  className="form-control"
                  name="famName"
                  value={formData.famName}
                  onChange={handleChange}
                  />
               {errors.famName && <span className="error-text">{errors.famName}</span>}

            </div>
            <div className="form-group">
               <label>Family Members Polling Station</label>
               <input
                  type="text"
                  className="form-control"
                  name="famStation"
                  value={formData.famStation}
                  onChange={handleChange}
                  />
               {errors.famStation && <span className="error-text">{errors.famStation}</span>}

            </div>
            <h2>Violent Cases</h2>
<div className="form-group">
   <label>Violent Cases</label>
   <div className="form-check">
      <input
         type="checkbox"
         className="form-check-input"
         name="intimidationThreats"
         checked={formData.intimidationThreats}
         onChange={handleChange}
      />
      <label className="form-check-label">Intimidation and Threats</label>
   </div>
   <div className="form-check">
      <input
         type="checkbox"
         className="form-check-input"
         name="voterSuppression"
         checked={formData.voterSuppression}
         onChange={handleChange}
      />
      <label className="form-check-label">Voter Suppression</label>
   </div>
   <div className="form-check">
      <input
         type="checkbox"
         className="form-check-input"
         name="clashesPollingStations"
         checked={formData.clashesPollingStations}
         onChange={handleChange}
      />
      <label className="form-check-label">Clashes at Polling Stations</label>
   </div>
   <div className="form-check">
      <input
         type="checkbox"
         className="form-check-input"
         name="attackCandidates"
         checked={formData.attackCandidates}
         onChange={handleChange}
      />
      <label className="form-check-label">Attack on Candidates</label>
   </div>
   <div className="form-check">
      <input
         type="checkbox"
         className="form-check-input"
         name="disruptionCampaignEvents"
         checked={formData.disruptionCampaignEvents}
         onChange={handleChange}
      />
      <label className="form-check-label">Disruption of Campaign Events</label>
   </div>
</div>

            <div className="mt-3 mb-4 text-right">
               <button type="submit" className="btn btn-primary">
               Add User
               </button>
            </div>
         </form>
      </div>
   </div>
</div>
);
}
export default Addusers;