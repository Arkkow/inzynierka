// General React imports
import * as React from "react";
import { useState } from "react";
// Project specific files
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// CSS files
import cup_logo from "../../assets/cup.svg";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import RangTick from "../common/Buttons/rang_tick";
import { getPendingApprovals, postAcceptInvite, postRejectInvite } from "../api/api";
import InfoPanel from "../common/info_panel";



const invitation = getPendingApprovals();
invitation.then((value) => {
  for (let i = 0; i < value.length; i++) {
    console.log(value[i]);
  }
});

export const CalendarCard = (props) => {
  const [invitations, setInvitations] = useState({ fetched: false, data: [] });
  if (invitations.fetched === false) {
    getPendingApprovals().then((dane) => {
      setInvitations({ fetched: true, data: dane });
    });
  }


  // function acceptInvintation(e) {
  //   e.preventDefault();
  //   console.log('You clicked submit.');
  // }
  //
  // function rejectInvintation(e) {
  //   e.preventDefault();
  //   console.log('You clicked submit.');
  // }
  console.log(getPendingApprovals());
  return (
    <Card
      border={"dark"}
      style={{ minWidth: "40%", margin: "2%", padding: "2%" }}
    >
      <Container fluid="md">
        <Row>
          {/*HI MOM! 1. {props.id} 2. {props.my_tournaments.tournamnet} &nbsp;*/}
          {/*{console.log("TOURNAMNET")}*/}
          {/*{console.log(props.my_tournaments.tournamnet)}*/}
          {/*{props.my_tournaments.some(x => x.tournamnet === props.id)?"HIIII":"NOPE"}*/}

          <Col sm={2}>
            {/*{props.view.screen === 'calendar' ? <h2>YES</h2>:<h2>NO</h2>}*/}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                height: "100%",
                alignItems: "center",
              }}
            >
              <img src={cup_logo} alt={""} />
            </div>
          </Col>
          <Col sm={5}>
            <Row className="justify-content-md-center">
              <h5>
                {props.name} &nbsp;
                <RangTick {...props} />
              </h5>
            </Row>

            <InfoPanel {...props} />
          </Col>
          {invitations.fetched === false ? (
            <h5>Brak zaproszeń na ten turniej</h5>
          ) : (
            invitations.data.map((invitation) => (
              <Col sm={2}>
                {invitation.tournament == props.id ? (
                  <Card.Text>
                    <div style={{ textAlign: "center" }}>
                      Użytkownik {invitation.inviter} cię do gry w tym turnieju
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Button variant="success" style={{ margin: "5%" }} onClick={() => postAcceptInvite(invitation.id)}>
                        TAK
                      </Button>
                      <Button variant="danger" style={{ margin: "5%" }} onClick={() => postRejectInvite(invitation.id)}>
                        NIE
                      </Button>
                    </div>
                  </Card.Text>
                ) : null}
              </Col>
            ))
          )}
          <Col sm={3}>
            <Row>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">...</Dropdown.Toggle>

                <Dropdown.Menu variant="secondary">
                  <Dropdown.Item>Action 1</Dropdown.Item>
                  <Dropdown.Item>Action 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            <br />
            <Row>
              <Button href={"tournament" + "?id=" + props.id}>
                Informacje
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CalendarCard;
