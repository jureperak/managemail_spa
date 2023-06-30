import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark" style={{position: "sticky"}}>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/new">Add New Email</Nav.Link>
                        <Nav.Link as={Link} to="/history">History</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;