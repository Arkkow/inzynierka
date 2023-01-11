// General React imports
import * as React from "react";

// Project specific files
import DrabinkaCard from "./drabinka_card";

// CSS files
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const DrabinkaRound = (props) => {

    let titles;
    if(props.numOfCols===4){
        titles = ["1/8 FINAŁU", "ĆWIERĆFINAŁY", "PÓŁFINAŁY", "FINAŁ"];
    } else {
        titles = ["ĆWIERĆFINAŁY", "PÓŁFINAŁY", "FINAŁ"];
    }


    return (
        <Col lg={12/props.numOfCols}>
            {props.ladders[props.chosen_match].length !== 0 ?
                <>
            <Row style={{marginBottom:"20px"}}>

                <Button variant="success"
                        style={{backgroundColor: "#0B4D39", width: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default", borderWidth:"0", minWidth:"260px"}}>
                   <my_h3> {titles[props.net_round-1]}</my_h3>
                </Button>
            </Row>


            {props.ladders[props.chosen_match].filter((e) => e.round_number.length === props.current_round).map((card)=>(
                // <div style={{marginTop: props.net_round===2 ? "125px":null}}>
                <div>
                    <DrabinkaCard {...card} tournamentID = {props.calendar_list.id} role = {props.user.role} refreshProps = {() => props.refreshProps({...props}, props.id)}/>
                </div>

                ))}
                </>:

                <my_h5>Brak wyników</my_h5>
            }
        </Col>
    )
}
export default DrabinkaRound;