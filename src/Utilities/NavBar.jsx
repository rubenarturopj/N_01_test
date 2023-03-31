import { Container, Nav, Navbar } from "react-bootstrap";

export function NavBar() {
    return (
        <Navbar
            sticky="top"
            className="navbar navbar-dark color-nav"
            expand="lg"
        >
            <Container>
                <Nav>
                    <Navbar.Brand href="/" id="RaleNav">
                        <strong id="bold">Neo</strong>legal
                    </Navbar.Brand>
                </Nav>
            </Container>
        </Navbar>
    );
}
