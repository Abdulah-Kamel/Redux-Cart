import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

const NavBar = () => {
  const state = useSelector((state) => state.cart);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand">
          Cart App
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="cart" className="nav-link">
              Cart<Badge bg="primary" className=" ms-1 rounded-circle">{state.length}</Badge> 
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
