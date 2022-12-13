import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Col, Form, Row} from "react-bootstrap";
import {getTournaments} from "../../api/tournament/tournament_CRUD_api";
import {getUser} from "../../api/user_interaction/user_api";
import {getPendingApprovals} from "../../api/api";
import {connect} from "react-redux";
import {useEffect} from "react";


export const Header = (props) => {

    useEffect(() => {
        props.handleDownloadCalendar();
        props.handleDownloadUser();
        props.getPendingApprovals();
    }, []);

    return (
        <Navbar bg="light" expand="lg" >
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginLeft: "7%"}}/>
            <Navbar.Collapse id="basic-navbar-nav" >

                <Container fluid="true">
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

                                    {props.user.role === "1" || props.user.role === "2" || props.user.role === "3"?
                                    <Button variant="outline-secondary">MOJE</Button>:
                                        null
                                    }
                                </Col>
                                <Col sm={8} style={{marginTop: "2%"}}>
                                    {props.user.role === "1" || props.user.role === "2" || props.user.role === "3"?
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
                                        </div>:
                                    null
                                    }
                                </Col>
                            </Row>
                        </Container>

                    </Nav>
                </Container>
            </Navbar.Collapse>

        </Navbar>
    );
};

// Przypisanie do Calendar_controller.props stanów
 const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data,
        view: state.view_content.data,
        // my_tournament_list: state.my_tournaments_content.data,
    };
};

//Wywołanie zmiany stanu (obsługa w store)
// Przekazanie data z API do stanu Calendar_controller
 const mapDispatchToProps = (dispatch) => {
    // let token =
    // let token = JSON.parse(localStorage.getItem("token")).token
    return {
        handleDownloadCalendar: () => {
            //    API z kalendarza
            getTournaments()
                .then((res) => {
                    return dispatch({
                        type: "DOWNLOAD_CALENDAR",
                        payload: { data: res },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        handleDownloadUser: () => {
            //    API z kalendarza
            getUser()
                .then((res) => {
                    console.log(res);
                    return dispatch({ type: "DOWNLOAD_USER", payload: { data: res } });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getPendingApprovals: () => {
            //    API z kalendarza
            getPendingApprovals()
                .then((res) => {
                    console.log(res);
                    return dispatch({ type: "DOWNLOAD_MY_TOURNAMENTS", payload: { data: res } });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        handleGOTO: (props) => {
            return dispatch({ type: "ROUTE_STATE", payload: { data: props } });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
