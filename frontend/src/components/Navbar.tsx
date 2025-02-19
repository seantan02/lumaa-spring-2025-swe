import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from "react-bootstrap";

interface NavigationProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function Navigation({ isAuthenticated, onLogout }: NavigationProps) {
  return (
    <Navbar bg="white" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Task Manager
        </Navbar.Brand>
        <Nav className="ms-auto">
          {isAuthenticated ? (
            <Button variant="link" onClick={onLogout} className="text-gray-600">
              Logout
            </Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="text-gray-600">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-gray-600">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}