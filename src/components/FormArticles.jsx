import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const API_URL = "http://localhost:8000";

const FormAricle = ({
  isOpen,
  onClose,
  title,
  articleID,
  onGetArticle,
}) => {
  const [formData, setFormData] = useState({
    nama: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    resetForm();
    if (isOpen && articleID > 0) {
      handleUpdate(articleID);
    }
  }, [isOpen]);

  const handleUpdate = (data) => {
    axios.get(`${API_URL}/articles/${data}`).then((response) => {
      const article = response.data;
      console.log("userId");
      console.log(article);
      setFormData({
        nama: article.nama,
        title: article.title,
        description: article.description,
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
    axios.post(`${API_URL}/articles`, formData).then((response) => {
      resetForm();
      onGetArticle();
      onClose();

      Swal.fire("Berhasil", "Data berhasil ditambahkan");
    });
  };

  const handleUpdateSubmit = () => {
    axios.put(`${API_URL}/articles/${articleID}`, formData).then((response) => {
      resetForm();
      onGetArticle();
      onClose();

      Swal.fire("Berhasil", "Data berhasil diubah");
    });
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      title: "",
      description: "",
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
            <Form.Label>Nama Article</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              onChange={handleChange}
              value={formData.nama}
              className="text-white bg-black border border-danger border-2 "
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>title article</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              className="text-white bg-black border border-danger border-2 "
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
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
        <Button onClick={articleID > 0 ? handleUpdateSubmit : handleSubmit} 
        className="text-white bg-black border border-danger border-2 ">
          {articleID > 0 ? "Update User" : "Create User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormAricle;
