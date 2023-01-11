// General react imports
import { connect } from "react-redux";
import { useEffect } from "react";

// Project specific files
import { getTournaments } from "../../../api/tournament/tournament_CRUD_api";
import { getUser } from "../../../api/user_interaction/user_api";
import { getPendingApprovals } from "../../../api/api";
import MyAllFilter from "./my_all_filter";
import DateFilter from "./date_filter";

// CSS files
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

export const Header = (props) => {

    useEffect(() => {
        props.handleDownloadCalendar();
        props.handleDownloadUser();
    }, []);

    return (
        <Row className="justify-content-md-center">
            <Col lg="6">
                <Navbar
                    expand="lg"
                    style={{
                        backgroundColor: "var(--light_grey)",
                        borderRadius: "10px",
                        marginBottom: "2%",
                        marginLeft: "30px",
                        marginRight: "30px",
                    }}
                >

                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        style={{ marginLeft: "7%" }}
                    />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Container fluid>
                            <Nav className="me-auto">
                                <Container>
                                    <DateFilter {...props}/>

                                    <Row style={{ marginTop: "2%", marginBottom: "2%" }}>

                                        <MyAllFilter {...props}/>

                                        <Col
                                            sm={6}
                                            style={{
                                                marginTop: "2%",
                                                display: "flex",
                                                justifyContent: "end",
                                            }}
                                        >
                                            {props.user.role === "2" || props.user.role === "3" ? (
                                                <div>
                                                    <Button
                                                        style={{
                                                            fontFamily: "Montserrat",
                                                            fontWeight: "600",
                                                            fontSize: "18px",
                                                            lineHeight: "25px",
                                                            color: "white",
                                                            borderRadius: "15px",
                                                            paddingBottom: "3%",
                                                            paddingTop: "3%",
                                                            paddingRight: "20px",
                                                            paddingLeft: "20px",
                                                        }}
                                                        variant="success"
                                                        href="new_tournament"
                                                    >
                                                        STWÓRZ NOWY TURNIEJ
                                                    </Button>
                                                </div>
                                            ) : null}
                                        </Col>
                                    </Row>
                                </Container>
                            </Nav>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
            </Col>
        </Row>
    );
};

// Przypisanie do Calendar_controller.props stanów
const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data,
        view: state.view_content.data,
    };
};

//Wywołanie zmiany stanu (obsługa w store)
// Przekazanie data z API do stanu Calendar_controller
const mapDispatchToProps = (dispatch) => {
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

        getAllPendingApprovals: () => {
            //    API z kalendarza
            getPendingApprovals()
                .then((res) => {
                    console.log(res);
                    return dispatch({
                        type: "DOWNLOAD_MY_TOURNAMENTS",
                        payload: { data: res },
                    });
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);