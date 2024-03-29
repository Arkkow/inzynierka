// General React imports
import * as React from "react";
import { useEffect, useState } from "react";

// Project specific files
import DrabinkaRound from "./drabinka_round";
import getLaddersFiltered from "./functions/getLadddersFiltered";
import EndTournament_popup from "../../../common/popups/end_tournament_popup";
import EndUnrankedTournament_popup from "../../../common/popups/end_unranked_tournament_popup";
import End_tournament_places_popup from "../../../common/popups/end_tournament_places_popup";
import { deleteLadder } from "../../../../api/tournament/ladders_api";

// CSS files
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SetTournamentRounds from "./set_rounds/set_tournament_rounds";
import { Form } from "react-bootstrap";


export const Drabinka = (props) => {
  useEffect(() => {
    props.handleDownloadPlayers(props.calendar_list.id);
    props.handleDownloadLadders(props.calendar_list.id);
    props.handleDownloadUser();
  }, []);

  const [chosen_match, set_chosen_match] = useState(() => {
    return 1;
  });

  let ladders = [{ id: 0 }];
  ladders = getLaddersFiltered(
    props.calendar_list.places,
    props.ladders_list.ladders["ALL"]
  );

  let min_round = 0;
  let max_round = 0;

  if (ladders[chosen_match][0] !== undefined) {
    min_round = ladders[chosen_match][0].round_number.length;
    max_round =
      ladders[chosen_match][ladders[chosen_match].length - 1].round_number
        .length;
  }

  let numOfCols = Math.log2(props.calendar_list.places);

  return (
    <>
      {ladders[1][0] !== undefined ? (
        <Row>
          <div>
            {props.calendar_list.typeOfLadder === "DRABINKA O MIEJSCA" ? (
                <Col lg={3} style={{marginBottom: "20px"}}>
                  <Form.Select
                    value={chosen_match}
                    onChange={(e) => set_chosen_match(e.target.value)}
                  >
                    <option value="1">DRABINKA GŁÓWNA</option>
                    <option value="3">DRABINKA O 3. MIEJSCE</option>
                    <option value="5">DRABINKA O 5. MIEJSCE</option>
                    <option value="7">DRABINKA O 7. MIEJSCE</option>
                    {props.calendar_list.places === 16 ? (
                      <>
                        <option value="9"> O 9. MIEJSCE</option>
                        <option value="11"> O 11. MIEJSCE</option>
                        <option value="13"> O 13. MIEJSCE</option>
                        <option value="15"> O 15. MIEJSCE</option>
                      </>
                    ) : null}
                  </Form.Select>
                </Col>
            ) : null}
          </div>
        </Row>
      ) : null}

            {props.calendar_list.state !== 3?
                <Row className="justify-content-md-center" >
                    <SetTournamentRounds
                            {...props}
                            tournament = {props.calendar_list}
                            places = {props.calendar_list.places}
                            pairs_list = {props.pairs_list}
                            ladders_length = {props.ladders_list.ladders["ALL"].length}
                            refreshProps = {() => props.refreshProps({...props}, props.id)}
                        />
                </Row>:null}

      {props.ladders_list.ladders["ALL"].length !== 0 ? (
        <Row>
          <DrabinkaRound
            net_round={1}
            current_round={min_round}
            numOfCols={numOfCols}
            ladders={ladders}
            chosen_match={chosen_match}
            calendar_list={props.calendar_list}
            user={props.user}
            refreshProps={() => props.refreshProps({ ...props }, props.id)}
          />
          {numOfCols >= 2 ? (
            <DrabinkaRound
              net_round={2}
              current_round={min_round + 1}
              numOfCols={numOfCols}
              ladders={ladders}
              chosen_match={chosen_match}
              calendar_list={props.calendar_list}
              user={props.user}
              refreshProps={() => props.refreshProps({ ...props }, props.id)}
            />
          ) : null}
          {numOfCols >= 3 ? (
            <DrabinkaRound
              net_round={3}
              current_round={min_round + 2}
              numOfCols={numOfCols}
              ladders={ladders}
              chosen_match={chosen_match}
              calendar_list={props.calendar_list}
              user={props.user}
              refreshProps={() => props.refreshProps({ ...props }, props.id)}
            />
          ) : null}
          {numOfCols >= 4 ? (
            <DrabinkaRound
              net_round={4}
              current_round={min_round + 3}
              numOfCols={numOfCols}
              ladders={ladders}
              chosen_match={chosen_match}
              calendar_list={props.calendar_list}
              user={props.user}
              refreshProps={() => props.refreshProps({ ...props }, props.id)}
            />
          ) : null}
        </Row>
      ) : (
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <Row
              style={{
                background: "white",
                marginTop: "10px",
                borderRadius: "10px",
                width: "100%",
                marginLeft:"0px"
              }}
            >
              <my_h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  color: "var(--black)"
                }}
              >
                Brak meczów do wyświetlenia
              </my_h4>
            </Row>
          </Col>
        </Row>
      )}

      {/** BUTTON USUWANIA TURNIEJÓW **/}
      {props.user.id === undefined ? null:
          props.user.role !== "3" && (props.user.role !== "2" || props.user.id !== props.calendar_list.creator)? null:
              props.calendar_list.state === 3? null :
          <div style={{display:"flex", justifyContent:"center", marginBottom:"20px", marginTop:"10px", fontFamily: 'Montserrat',
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "25px", paddingRight:"15px", paddingLeft:"15px"}}>

              <Button variant="danger" onClick={ () => {
                  for(let i=0;i<props.ladders_list.ladders["ALL"].length;i++){
                      deleteLadder(props.ladders_list.ladders["ALL"][i].id).then(r => console.log(r))
                  }
              }}>
                  USUŃ DRABINKI
              </Button>
          </div>
      }

      {props.calendar_list.creator === props.user.id ?
          props.calendar_list.state === 2?
                <div style={{marginTop:"20px", marginBottom:"20px", display:"flex", justifyContent:"center"}}>
                    { props.calendar_list.approved === 2 ?
                    (props.calendar_list.typeOfLadder === "DRABINKA O MIEJSCA" ?
                        <div><End_tournament_places_popup  {...props}/></div> :
                        <div><EndTournament_popup  {...props}/></div>) :
                    <div><EndUnrankedTournament_popup/></div>
                }
                </div>:null
             :null}

        </>
    );
}

export default Drabinka;
