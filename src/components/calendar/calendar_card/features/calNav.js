// General react imports
import { connect } from "react-redux";
import { useEffect } from "react";

// Project specific files
import { getTournaments } from "../../../../api/tournament/tournament_CRUD_api";
import { getUser } from "../../../../api/user_interaction/user_api";
import { getPendingApprovals } from "../../../../api/api";

// CSS files
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Col, Form, Row } from "react-bootstrap";

function saveData() {
  console.log(document.getElementById("dateFrom").value === "");
  if (
      document.getElementById("dateFrom").value !== "" ||
      document.getElementById("dateTo").value !== ""
  ) {
      if (document.getElementById("dateFrom").value !== "") {
        localStorage.setItem(
          "dateFrom",
          document.getElementById("dateFrom").value
        );
      }
      if (document.getElementById("dateTo").value !== "") {
        localStorage.setItem("dateTo", document.getElementById("dateTo").value);
      }
      window.location.reload()
    }
   else {
    alert("Daty do filtracji są puste!");
  }
}

function deleteFilterData() {
  localStorage.removeItem("dateFrom");
  localStorage.removeItem("dateTo");
  window.location.reload();
}

export const Header = (props) => {
  useEffect(() => {
    props.handleDownloadCalendar();
    props.handleDownloadUser();
  }, []);

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "var(--light_grey)",
        borderRadius: "10px",
        marginBottom: "2%",
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
              <Row style={{ marginTop: "1%" }}>
                <Col sm={4}>
                  <my_h4 style={{ paddingLeft: "10px" }}>Data rozpoczęcia od</my_h4>
                  <Form.Control
                    style={{
                      marginTop: "8px",
                      height: "80%",
                      borderRadius: "100px",
                        maxHeight:"52px"
                    }}
                    type="date"
                    id="dateFrom"
                    defaultValue={localStorage.getItem("dateFrom")}
                  />
                </Col>
                <Col sm={4}>
                  <my_h4 style={{ paddingLeft: "10px" }}>Data rozpoczęcia do</my_h4>
                  <Form.Control
                    style={{
                      marginTop: "8px",
                      height: "80%",
                      borderRadius: "100px",
                        maxHeight:"52px"
                    }}
                    type="date"
                    id="dateTo"
                    defaultValue={localStorage.getItem("dateTo")}
                  />
                </Col>
                  <Col sm={4} style={{display:"flex", alignItems:"end", marginTop:"35px", justifyContent:"center"}}>
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
                              marginRight: "20px"

                          }}
                          variant="success"
                          onClick={saveData}
                      >
                          FILTRUJ
                      </Button>

                      {localStorage.getItem("dateFrom") !== null ||
                      localStorage.getItem("dateTo") ? (
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
                              onClick={deleteFilterData}
                          >
                              WYCZYŚĆ
                          </Button>
                      ) : null}

                  </Col>
              </Row>

              <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
                {props.user.role === "1" ? (
                  <Col
                    sm={12}
                    style={{
                      marginTop: "2%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {window.location.href.split("/")[3] == "myTournaments" ? (
                      <>
                        <Col
                          sm={6}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            className="btn btn-primary"
                            href="calendar"
                            style={{
                              maxHeight: "40px",
                              marginRight: "25px",
                              borderColor: "var(--medium_grey)",
                              backgroundColor: "white",
                              color: "var(--dark_grey)",
                            }}
                          >
                            <my_h4>WSZYSTKIE</my_h4>
                          </Button>
                        </Col>
                        <Col
                          sm={6}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            className="btn btn-primary"
                            style={{
                              maxHeight: "40px",
                              borderColor: "var(--medium_grey)",
                              backgroundColor: "white",
                              color: "var(--black)",
                            }}
                            href="myTournaments"
                          >
                            <my_h4>MOJE</my_h4>
                          </Button>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col
                          sm={6}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            className="btn btn-primary"
                            href="calendar"
                            style={{
                              maxHeight: "40px",
                              marginRight: "25px",
                              borderColor: "var(--medium_grey)",
                              backgroundColor: "white",
                              color: "var(--black)",
                            }}
                          >
                            <my_h4>WSZYSTKIE</my_h4>
                          </Button>
                        </Col>
                        <Col
                          sm={6}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            className="btn btn-primary"
                            style={{
                              maxHeight: "40px",
                              borderColor: "var(--medium_grey)",
                              backgroundColor: "white",
                              color: "var(--dark_grey)",
                            }}
                            href="myTournaments"
                          >
                            <my_h4>MOJE</my_h4>
                          </Button>
                        </Col>
                      </>
                    )}
                  </Col>
                ) : (
                  <>
                    <Col
                      sm={6}
                      style={{
                        marginTop: "2%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {props.user.role === "2" || props.user.role === "3" ? (
                        <>
                          {window.location.href.split("/")[3] ==
                          "myTournaments" ? (
                            <>
                              <Button
                                className="btn btn-primary"
                                href="calendar"
                                style={{
                                  maxHeight: "40px",
                                  marginRight: "10%",
                                  borderColor: "var(--medium_grey)",
                                  backgroundColor: "white",
                                  color: "var(--dark_grey)",
                                }}
                              >
                                <my_h4>WSZYSTKIE</my_h4>
                              </Button>
                              <Button
                                className="btn btn-primary"
                                style={{
                                  maxHeight: "40px",
                                  borderColor: "var(--medium_grey)",
                                  backgroundColor: "white",
                                  color: "var(--black)",
                                }}
                                href="myTournaments"
                              >
                                <my_h4>MOJE</my_h4>
                              </Button>{" "}
                            </>
                          ) : (
                            <>
                              {" "}
                              <Button
                                className="btn btn-primary"
                                href="calendar"
                                style={{
                                  maxHeight: "40px",
                                  marginRight: "10%",
                                  borderColor: "var(--medium_grey)",
                                  backgroundColor: "white",
                                  color: "var(--black)",
                                }}
                              >
                                <my_h4>WSZYSTKIE</my_h4>
                              </Button>
                              <Button
                                className="btn btn-primary"
                                style={{
                                  maxHeight: "40px",
                                  borderColor: "var(--medium_grey)",
                                  backgroundColor: "white",
                                  color: "var(--dark_grey)",
                                }}
                                href="myTournaments"
                              >
                                <my_h4>MOJE</my_h4>
                              </Button>{" "}
                            </>
                          )}
                        </>
                      ) : null}
                    </Col>
                    <Col
                      sm={6}
                      style={{
                        marginTop: "2%",
                        display: "flex",
                        justifyContent: "center",
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
                  </>
                )}
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
