import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const API_URL = "http://localhost:8000";

const FormCategories = ({
  isOpen,
  onClose,
  title,
  categoriesID,
  onGetCategories,
}) => {
  const [formData, setFormData] = useState({
    nama: ""
  });

  useEffect(() => {
    resetForm();
    if (isOpen && categoriesID > 0) {
      handleUpdate(categoriesID);
    }
  }, [isOpen]);

  const handleUpdate = (data) => {
    axios.get(`${API_URL}/categories/${data}`).then((response) => {
      const categories = response.data;
      console.log("userId");
      console.log(categories);
      setFormData({
        nama: categories.nama
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post(`${API_URL}/categories`, formData).then((response) => {
      resetForm();
      onGetCategories();
      onClose();

      Swal.fire("Berhasil", "Data berhasil ditambahkan");
    });
  };

  const handleUpdateSubmit = () => {
    axios.put(`${API_URL}/categories/${categoriesID}`, formData).then((response) => {
      resetForm();
      onGetCategories();
      onClose();

      Swal.fire("Berhasil", "Data berhasil diubah");
    });
  };

  const resetForm = () => {
    setFormData({
      nama: ""
    });
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      dialogClassName="modal-dialog modal-lg"
      centered
    >
      <Modal.Header className="text-white bg-black border border-danger border-2 ">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-white bg-black border border-danger border-2 ">
        <Form>
          <Form.Group>
            <Form.Label>Nama Categories</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              onChange={handleChange}
              value={formData.nama}
              className="text-white bg-black border border-danger border-2 "
            />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="text-white bg-black border border-danger border-2 ">
        <Button variant="gray" onClick={onClose}  
        className="text-white bg-black border border-primary border-2 ">
          Close
        </Button>
        <Button onClick={categoriesID > 0 ? handleUpdateSubmit : handleSubmit} 
        className="text-white bg-black border border-danger border-2 ">
          {categoriesID > 0 ? "Update User" : "Create User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormCategories;
