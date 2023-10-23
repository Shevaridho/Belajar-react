import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Header from "../components/Header";
import "../stayle/landing.css";
import FormCategories from "../components/FormCategories";

const URL_API = 'http://localhost:8000';

const Categories = () => {
     const [categories, setCategories] = useState([]);

     const [categoriesID, setCategoriesID] = useState(0);
     const [isOpen, setIsOpen] = useState(false);
     const [title, setTitle] = useState("Title");
   
    const getcategories=()=>{
    axios.get(`${URL_API}/categories`)
    .then((res) => {
      setCategories(res.data);
      
    })
  }


  useEffect(()=>{
        getcategories();
        
      console.log(categories);
    },[]);

    const handleOpen = (data ) => {
      setIsOpen(true);
      setTitle("Create Categories");
      setCategoriesID(null);
      console.log(data);
      if (data > 0) {
        setTitle("Edit Categories");
        setCategoriesID(data);
      }
      console.log(data);
    };
    
  const handleDelete = (data ="undefined") => {
    axios.delete(`${URL_API}/categories/${data}`).then(() => {
      const updateCategories = categories.filter((categories) => categories.id !== data);
      setCategories(updateCategories);
      Swal.fire("Berhasil", "Data berhasil dihapus");
    });
  };
  const handleClose = () => {
    setIsOpen(false);
  };

return (
  <Fragment>
    <Header />
    <Container className="pt-3"> 
      <Row>
        <Col xl="12">
          <Button onClick={handleOpen} className="text-white bg-black border border-danger border-2 ">
            Create
          </Button>
        </Col>
        <Col xl="12">
        <FormCategories
              isOpen={isOpen}
              title={title}
              categoriesID={categoriesID}
              onClose={handleClose}
              onGetCategories={getcategories}
            />
          <Card className="border border-danger border-1 bg-black mt">
            <Card.Header className="border border-danger border-1">
              <div className="text-white">Categories List</div>
              </Card.Header>
            <Card.Body className="border border-danger border-1">
              <Table >
                <thead>
                  <tr>
                    <th className="text-white bg-black border border-danger">No</th>
                    <th className="text-white bg-black border border-danger">Nama</th>
                    <th className="sp text-white bg-black border border-danger">Action</th>
                  </tr>
                </thead>
                <tbody>
                    
                  {
                  categories.map((categorie,index) => (
                    <tr key={index}>
                      <td className="text-white bg-black border border-danger">{index+1}</td>
                      <td className="text-white bg-black border border-danger">{categorie.nama}</td>
                      <td className="sp text-white bg-black border border-danger">
                        <Button 
                        className="text-white bg-black border border-primary border-2 mr"
                          variant="danger"
                          onClick={()=> handleDelete(categorie.id)}
                        >
                          Delete
                        </Button>
                        <Button
                        className="text-white bg-black border border-danger border-2"
                          variant="danger"
                          onClick={()=>handleOpen(categorie.id)}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Fragment>
);
  }
  export default Categories ;