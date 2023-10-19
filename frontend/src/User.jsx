import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Table ,Button} from 'react-bootstrap'; // Import Bootstrap components
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';



function User() {

  // Add user details
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([
    { id: '1', col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4', col5: 'Data 5', col6: 'Data 6' }
    // You can add more initial user data here
  ]);

  const downloadCsv = () => {
    try {
      if (data.length === 0) {
        console.log('No data available to export.');
        return;
      }
  
      const csvContent = Papa.unparse(data, { header: true });
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'user_data.csv');
    } catch (error) {
      console.error('Error creating CSV:', error);
    }
  };
  
  
  

  const downloadPdf = () => {
    try {
      const pdf = new jsPDF();
      
      // Add a title to the PDF
      pdf.text('Census of Officers Election Report', 10, 10);
  
      // Add table headers
      const headers = ['Full Name', 'DOB', 'Email', 'Age', 'Education Level', 'Gender', 'Current City','Province', 'District', 'Polling Division', 'Polling Station', 'Current Position', 'Name of Institute', 'Experience', 'Current Salary', 'Position Type', 'NIC','FamName','FamPollingStation'];
      const dataRows = data.map(employee => [
        employee['Full Name'],
        employee['DOB'],
        employee['Email'],
        employee['Age'],
        employee['Education Level'],
        employee['Gender'],
        employee['Current City'],
        employee['Province'],
        employee['District'],
        employee['Polling Division'],
        employee['Current Position'],
        employee['Name of Institute'],
        employee['Experience'],
        employee['Current Salary'],
        employee['Position Type'],
        employee['NIC'],
        employee['FamName'],
        employee['FamPollingStation']
      ]);
  
      pdf.autoTable({
        head: [headers],
        body: dataRows,
        startY: 20,
        margin: { top: 20 }
      });
  
      // Save the PDF
      pdf.save('user_data.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };
  
  
  const handleDelete = (id)=>{
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res=>{
      if (res.data.Status==="Success") {
       window.location.reload(true)
      }
    })    
  }
  

  useEffect(() => {
    axios.get('http://localhost:8081/getEmployees')
    .then(res=>{
      if (res.data.Status==="Success") {
        console.log(res.data.Result);
        setData(res.data.Result)
      }
    })
    .catch(err=>console.log(err));
  }, [])

  return (
    <Container className="d-flex flex-column align-items-center add-users">
      <h1 className="mt-5">Census of Officers Election Report </h1>
      <div className="d-flex justify-content-end w-100">
        <Link to="/create" variant="primary" className="btn btn-primary my-3">
          Add Users
        </Link>
        <Button variant="success" className="my-3 ms-3" onClick={downloadCsv}>
          Download CSV
        </Button>
        <Button variant="success" className="my-3 ms-3" onClick={downloadPdf}>
    Download PDF
  </Button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Full name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Age</th>
            <th>Education Level</th>
            <th>Gender</th>
            <th>Currenty City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee,index)=>{
            return <tr key={index}> 
            <td>{employee['Full Name']}</td>
            <td>{employee['DOB']}</td>
            <td>{employee['Email']}</td>
            <td>{employee['Age']}</td>
            <td>{employee['Education Level']}</td>
            <td>{employee['Gender']}</td>
            <td>{employee['Current City']}</td>
            
            <td>
              <Link to={`/employeeEdit/`+employee.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
              <button onClick={e=>handleDelete(employee.id)} className='btn btn-sm btn-danger'>Delete</button>
            </td>
          </tr>
             })}
        </tbody>
      </Table>
    </Container>
  );
}

export default User;
