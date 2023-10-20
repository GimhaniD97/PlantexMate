import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

function ProductionLines() {
  const [data, setData] = useState([]);
  const [selectedProductionLine, setSelectedProductionLine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    productionLines: '',
    maxSMV: '',
    minSMV: '',
  });

  const downloadCsv = () => {
    try {
      if (data.length === 0) {
        console.log('No data available to export.');
        return;
      }

      const csvContent = Papa.unparse(data, { header: true });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'production_line_data.csv');
    } catch (error) {
      console.error('Error creating CSV:', error);
    }
  };

  const downloadPdf = () => {
    try {
      const pdf = new jsPDF();

      pdf.text('Census of Production Lines Report', 10, 10);

      const headers = ['Production Line', 'Max SMV', 'Min SMV'];
      const dataRows = data.map((line) => [
        line['productionLines'],
        line['maxSMV'],
        line['minSMV'],
      ]);

      pdf.autoTable({
        head: [headers],
        body: dataRows,
        startY: 20,
        margin: { top: 20 },
      });

      pdf.save('production_line_data.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  const handleShowDetails = (productionLine) => {
    setSelectedProductionLine(productionLine);
  
    // Populate editFormData with the selected production line's data
    setEditFormData({
      productionLines: productionLine.productionLines,
      maxSMV: productionLine.maxSMV,
      minSMV: productionLine.minSMV,
    });
  
    setShowModal(true);
  };
  
  const handleClose = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    const { id } = selectedProductionLine; // Get the id of the selected production line
    const updatedData = editFormData; // Use the updated data from editFormData
  
    axios
      .put(`http://localhost:8081/editProductionLine/${id}`, updatedData)
      .then((res) => {
        if (res.data.Status === 'Success') {
          // Reload data or update state to reflect changes
          setShowModal(false);
          window.location.reload(true); // Reload the page to reflect the changes
        }
      })
      .catch((error) => {
        console.error('Error updating production line:', error);
      });
  };
  

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/deleteProductionLine/${id}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        }
      });
  };

  
  useEffect(() => {
    axios
      .get('http://localhost:8081/getProductionLines')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center add-users">
      <h1 className="mt-5">Production Lines</h1>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Production Line</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Production Line</Form.Label>
              <Form.Control
                type="text"
                name="productionLines"
                value={editFormData.productionLines}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    productionLines: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max SMV</Form.Label>
              <Form.Control
                type="text"
                name="maxSMV"
                value={editFormData.maxSMV}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, maxSMV: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Min SMV</Form.Label>
              <Form.Control
                type="text"
                name="minSMV"
                value={editFormData.minSMV}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, minSMV: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-end w-100">
        <Link to="../addline" variant="primary" className="btn btn-primary my-3">
          Add Production Line
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
            <th>Production Line</th>
            <th>Max SMV</th>
            <th>Min SMV</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((productionLine, index) => {
            return (
              <tr key={index}>
                <td>{productionLine['productionLines']}</td>
                <td>{productionLine['maxSMV']}</td>
                <td>{productionLine['minSMV']}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleShowDetails(productionLine)}
                  >
                    Edit
                  </Button>
                  <Button variant="info" size="sm" onClick={() => handleShowDetails(productionLine)}>
                    Details
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(productionLine.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductionLines;
