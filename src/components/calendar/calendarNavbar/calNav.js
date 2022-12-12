import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Col, Form, Row} from "react-bootstrap";


export const Header = () => {
    return (
        <Navbar expand="lg" style={{backgroundColor:"var(--light_grey)", borderRadius:"10px", marginBottom:"2%"}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginLeft: "7%"}}/>
            <Navbar.Collapse id="basic-navbar-nav" >

                <Container fluid>
                    <Nav className="me-auto">
                        <Container>
                            <Row style={{marginTop: "1%"}}>
                                <Col sm={6}>
                                    <my_h4 style={{paddingLeft:"10px"}}>Od</my_h4>
                                    <Form.Control style={{marginTop: "1%", height:"80%", borderRadius:"100px"}} type="date"/>
                                </Col>
                                <Col sm={6}>
                                    <my_h4 style={{paddingLeft:"10px"}}>Do</my_h4>
                                    <Form.Control style={{marginTop: "1%", height:"80%", borderRadius:"100px"}} type="date" />
                                </Col>
                            </Row>
                            <Row style={{marginTop: "2%", marginBottom: "2%"}}>
                                <Col sm ={6} style={{marginTop: "2%"}}>
                                    <Button className="btn btn-primary" style={{marginLeft:"20%", marginRight:"10%", borderColor:"var(--medium_grey)", backgroundColor:"white", color:"var(--black)"}}><my_h4>WSZYSTKIE</my_h4></Button>
                                    <Button className="btn btn-primary" style={{borderColor:"var(--medium_grey)", backgroundColor:"white", color:"var(--dark_grey)"}}><my_h4>MOJE</my_h4></Button>
                                </Col>
                                <Col sm={6} style={{marginTop: "2%"}}>
                                    <div style={{float: "right", marginRight:"15%"}}>
                                        <Button
                                            style={{
                                                fontFamily: "Montserrat",
                                                fontWeight: "600",
                                                fontSize: "18px",
                                                lineHeight: "25px",
                                                color: "white",
                                                borderRadius: "15px",
                                                paddingBottom:"3%",
                                                paddingTop:"3%",
                                                paddingRight:"20px",
                                                paddingLeft:"20px"
                                            }}
                                            variant="success"
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
