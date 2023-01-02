// General React imports
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {deleteUserAdmin, getUsersAdmin, postUserAdmin} from "../components/api/admin/user_admin_manageroles_api";
import * as React from "react";
import {deleteTournamentAdmin} from "../components/api/admin/tournament_admin_api";


// Project specific files

export default function AdminUsers() {
  const [cart, setCart] = useState({ fetched: false, data: [] });

  if (cart.fetched === false) {
    getUsersAdmin().then((dane) => {
      setCart({ fetched: true, data: dane });
    });
  }
  return (

    <Container
      fluid="true"
      style={{ background: "#689F82", minHeight: "94vh", paddingTop: "2%" }}
    >
      <Row className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <Col sm={4}>
            {cart.fetched === false ? (
                <my_h4>Ładowanie...</my_h4>
            ) : (
              cart.data.map((card) => (
                <Card
                  style={{ minWidth: "40%", margin: "3%", padding: "2%", borderRadius:"20px", borderColor:"var(--medium_grey)" }}
                >

                  <Container fluid="md">
                    <Row>
                      <Row style={{marginBottom:"10px"}}>
                        {/*<Col sm={2} style={{display:"flex", justifyContent:"left"}}>*/}
                        {/*  <my_h4 style={{fontWeight:"400"}}>{`ID: ${card.id} `}</my_h4>*/}
                        {/*</Col>*/}
                        {/*<Col sm={10} style={{display:"flex", justifyContent:"left"}}>*/}
                        {/*  <my_h4 style={{fontWeight:"400"}}>{`${card.surname} ${card.name}`}</my_h4>*/}
                        {/*</Col>*/}
                        <Col sm={12} style={{display:"flex", justifyContent:"left"}}>
                          <my_h4 style={{fontWeight:"400"}}>{`${card.surname} ${card.name}    --- ID: ${card.id}`}</my_h4>
                        </Col>
                        {/*<Col sm={5} style={{display:"flex", justifyContent:"left"}}>*/}
                        {/*  <my_h4 style={{fontWeight:"400"}}>{`Nazwisko: ${card.name}`}</my_h4>*/}
                        {/*</Col>*/}
                      </Row>
                      <div>

                        {card.deleted === 0 ? (
                          <Form.Check
                              style={{
                                color: "black",
                                fontFamily: 'Montserrat',
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px"
                          }}
                              type={"radio"}
                              name={`${card.id}`}
                              label={"Administrator"}
                              checked={card.role == 3}
                              onClick={() => {
                                postUserAdmin({ id: card.id.toString(), role: "3" });
                                setTimeout(function(){
                                  window.location.reload();
                                }, 400);
                              }}
                          />) : (null) }
                        {card.deleted === 0 ? (
                            <Form.Check
                                style={{
                                  color: "black",
                                  fontFamily: 'Montserrat',
                                  fontStyle: "normal",
                                  fontWeight: "400",
                                  fontSize: "16px"
                                }}
                                inline
                                type={"radio"}
                                name={`${card.id}`}
                                label={"Organizator"}
                                checked={card.role == 2}
                                onClick={() => {
                                  postUserAdmin({ id: card.id.toString(), role: "2" });
                                  setTimeout(function(){
                                    window.location.reload();
                                  }, 1000);
                                }}
                            />) : (null) }
                        {card.deleted === 0 ? (
                            <Form.Check
                                style={{
                                  color: "black",
                                  fontFamily: 'Montserrat',
                                  fontStyle: "normal",
                                  fontWeight: "400",
                                  fontSize: "16px"
                                }}
                                type={"radio"}
                                name={`${card.id}`}
                                label={"Uczestnik"}
                                checked={card.role == 1}
                                onClick={() => {
                                  postUserAdmin({ id: card.id.toString(), role: "1" });
                                  setTimeout(function(){
                                    window.location.reload();
                                  }, 1000);
                                }}
                            />) : (null) }
                      </div>

                      {card.deleted === 0 ? (
                          <Row style={{display:"flex", justifyContent:"center"}}>
                            <Button
                                variant="danger"
                                style={{
                                  fontFamily: "Montserrat",
                                  fontWeight: "600",
                                  fontSize: "18px",
                                  lineHeight: "25px",
                                  color: "white",
                                  borderRadius: "13px",
                                  paddingRight:"15px",
                                  paddingLeft:"15px",
                                  marginTop:"10px",
                                  width:"250px"}}
                                onClick={() => {
                                  deleteUserAdmin(card.id.toString());
                                  setTimeout(function(){
                                    window.location.reload();
                                  }, 400);
                                }}
                            >
                              USUŃ UŻYTKOWNIKA
                            </Button>
                          </Row>

                      ) : (
                          <Row><my_h4 style={{marginTop:"7px", fontWeight:"400", display:"flex", justifyContent:"center"}}>Ten użytkownik został usunięty.</my_h4></Row>

                      )}




                    </Row>
                  </Container>



                </Card>
              ))
            )}
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
