import Header from "../components/Header";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "../stayle/landing.css";
const Home = ()=>{
    return(
        <div>
             <Header/>
             <Container className="pt-3 "> 
                <Row >
                    <Col xl="12">
                    <Card className='border border-danger border-1 bg-black' >
                        <Card.Header className='border border-danger border-1' >
                            <div className='text-white'>Home</div>
                        </Card.Header>
                        
                        <Card.Body className='border border-danger border-1'>
                            <div className='text-white'>
                                Yooo! 
                                <p>Hehehehehehehehe :V</p> 
                            </div>
                        
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                </Container>
        </div>
    )
}
export default Home;