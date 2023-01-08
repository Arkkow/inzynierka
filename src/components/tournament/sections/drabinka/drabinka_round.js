// General React imports
import * as React from "react";

// Project specific files
import DrabinkaCard from "./drabinka_card";

// CSS files
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const DrabinkaRound = (props) => {

    let titles = ["PIERWSZA", "DRUGA", "TRZECIA", "CZWARTA"];


    return (
        <Col sm={12/props.numOfCols}>
            {props.ladders[props.chosen_match].length !== 0 ?
                <>
            <Row>
                <Button variant="success"
                        style={{background: "green", width: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}>
                    {titles[props.net_round-1]} RUNDA
                </Button>
            </Row>


            {props.ladders[props.chosen_match].filter((e) => e.round_number.length === props.current_round).map((card)=>(
                    <DrabinkaCard {...card} tournamentID = {props.calendar_list.id} role = {props.user.role} refreshProps = {props.refreshProps}/>
                ))}
                </>:

                <my_h5>Brak wyników</my_h5>
            }
        </Col>
    )
}
export default DrabinkaRound;