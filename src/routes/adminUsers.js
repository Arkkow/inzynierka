// General React imports
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {
  getUsersAdmin,
  postUserAdmin,
  deleteUserAdmin,
} from "../components/api/api.js";

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
      style={{ background: "#c2d1b8", minHeight: "94vh", paddingTop: "2%" }}
    >
      <Row className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <Col sm={6}>
            {cart.fetched === false ? (
              <h5>no results available</h5>
            ) : (
              cart.data.map((card) => (
                <Card
                  border={"dark"}
                  style={{ minWidth: "40%", margin: "2%", padding: "2%" }}
                >
                  <Container fluid="md">
                    <Row>
                      {`id:${card.id} name:${card.name} surname:${card.surname}`}
                      <Form.Check
                        type={"radio"}
                        name={`${card.id}`}
                        label={"admin"}
                        checked={card.role == 3}
                        onClick={() => {
                          postUserAdmin({ id: card.id.toString(), role: "3" });
                        }}
                      />
                      <Form.Check
                        inline
                        type={"radio"}
                        name={`${card.id}`}
                        label={"organizer"}
                        checked={card.role == 2}
                        onClick={() => {
                          postUserAdmin({ id: card.id.toString(), role: "2" });
                        }}
                      />
                      <Form.Check
                        type={"radio"}
                        name={`${card.id}`}
                        label={"normal user"}
                        checked={card.role == 1}
                        onClick={() => {
                          postUserAdmin({ id: card.id.toString(), role: "1" });
                        }}
                      />
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteUserAdmin(card.id.toString());
                        }}
                      >
                        delete
                      </Button>
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
