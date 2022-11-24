import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Col, Form, Row} from "react-bootstrap";


function Header() {
    return (
        <Navbar bg="light" expand="lg" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginLeft: "7%"}}/>
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Container fluid>
                        <Nav className="me-auto">
                            <Container>
                                <Row style={{marginTop: "1%"}}>
                                    <Col sm={6}>
                                        <Form.Control type="date"/>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Control type="date" />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "2%", marginBottom: "2%"}}>
                                    <Col sm ={4} style={{marginTop: "2%"}}>
                                        <Button variant="secondary" >WSZYSTKIE</Button>
                                        <Button variant="outline-secondary">MOJE</Button>
                                    </Col>
                                    <Col sm={8} style={{marginTop: "2%"}}>
                                        <div style={{float: "right"}}>
                                            <Button
                                                style={{
                                                    fontFamily: "Montserrat",
                                                    fontWeight: "600",
                                                    fontSize: "18px",
                                                    lineHeight: "25px",
                                                    color: "white"
                                                }}
                                                type="button"
                                                className="btn btn-success"
                                                href="new_tournament"
                                               >STWÓRZ NOWY TURNIEJ</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>

                        </Nav>
                    </Container>
                </Navbar.Collapse>

        </Navbar>
    );
}

export default Header;
