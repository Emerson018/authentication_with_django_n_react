import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom'; 

function TopNavbar() {
  const {user, logoutUser} = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  let user_id;
  if (token){
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token === null && 
            <>
              <Nav.Link 
                as={Link} 
                to="/login">Login</Nav.Link>
              <Nav.Link
                style={{cursor:"pointer"}}
                as={Link} 
                to="/register">Register</Nav.Link>
            </>
            }

            {token !== null && 
            <>
              <Nav.Link 
                as={Link} 
                to="/dashboard">Dashboard
              </Nav.Link>

              <Nav.Link
                onClick={logoutUser} 
                as={Link} 
                to="/logout">Logout
              </Nav.Link>
            </>
            }
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              as={Link} 
              to="/getdata">dadosAPI
            </Nav.Link>
            <Nav.Link
              as={Link} 
              to="/chartpage">Gráficos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
