import { Nav,Navbar,Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Header() {
    const Navlink=useNavigate();
  return (
    <Navbar expand="lg" className="bg-black border border-danger">
      <Container>
        <img src="https://i.pinimg.com/736x/cf/5f/00/cf5f00f7c602422a71e85eb9351bfe96.jpg" alt="" srcset="" className="imglogo"/>
        <Navbar.Brand onClick={()=>Navlink('/')} className="text-white">Hehehe-Shira</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link  className="text-white" onClick={()=>Navlink('/')}>
              Home
            </Nav.Link>
            <Nav.Link className="text-white" onClick={()=>Navlink('/Articles')}>
              Articles
            </Nav.Link>
            <Nav.Link className="text-white" onClick={()=>Navlink('/Categories')}>
              Categories
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;