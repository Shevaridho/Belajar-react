import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import Header from "../components/Header";
import "../stayle/landing.css";
import FormAricle from "../components/FormArticles";

const URL_API = 'http://localhost:8000';

const Articles = () => {
     const [articles, setArticles] = useState([]);

     const [articleID, setArticleID] = useState(0);
     const [isOpen, setIsOpen] = useState(false);
     const [title, setTitle] = useState("Title");
   
    const getarticle=()=>{
    axios.get(`${URL_API}/articles`)
    .then((res) => {
      setArticles(res.data);
      console.log(articles);
      
    })
  }


  useEffect(()=>{
        getarticle();
    },[]);
    const handleOpen = (data ) => {
      setIsOpen(true);
      setTitle("Create Article");
      setArticleID(null);
      if (data > 0) {
        setTitle("Edit Article");
        setArticleID(data);
      }
      console.log(data);
    };
    
  const handleDelete = (data ="undefined") => {
    axios.delete(`${URL_API}/articles/${data}`).then(() => {
      const updatedArticles = articles.filter((article) => article.id !== data);
      setArticles(updatedArticles);
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
        <FormAricle
              isOpen={isOpen}
              title={title}
              articleID={articleID}
              onClose={handleClose}
              onGetArticle={getarticle}
            />
          <Card className="border border-danger border-1 bg-black mt">
            <Card.Header className="border border-danger border-1">
              <div className="text-white">articles List</div>
              </Card.Header>
            <Card.Body className="border border-danger border-1">
              <Table >
                <thead>
                  <tr>
                    <th className="text-white bg-black border border-danger">No</th>
                    <th className="text-white bg-black border border-danger">Nama</th>
                    <th className="text-white bg-black border border-danger">Title</th>
                    <th className="text-white bg-black border border-danger">description</th>
                    <th className="sp text-white bg-black border border-danger">Action</th>
                  </tr>
                </thead>
                <tbody>
                    
                  {
                  articles.map((article,index) => (
                    <tr key={index}>
                      <td className="text-white bg-black border border-danger">{index+1}</td>
                      <td className="text-white bg-black border border-danger">{article.nama}</td>
                      <td className="text-white bg-black border border-danger">{article.title}</td>
                      <td className="text-white bg-black border border-danger">{article.description}</td>
                      <td className="sp text-white bg-black border border-danger">
                        <Button 
                        className="text-white bg-black border border-primary border-2 mr"
                          variant="danger"
                          onClick={()=> handleDelete(article.id)}
                        >
                          Delete
                        </Button>
                        <Button
                        className="text-white bg-black border border-danger border-2"
                          variant="danger"
                          onClick={()=>handleOpen(article.id)}
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
  export default Articles ;