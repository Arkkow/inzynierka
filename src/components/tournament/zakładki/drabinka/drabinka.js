// General React imports
import * as React from 'react';
import {useState} from "react";

// Project specific files
import DrabinkaRound from "./drabinka_round";
import getLaddersFiltered from "./functions/getLadddersFiltered";

// CSS files
import { Row } from "react-bootstrap";
import EndTournament_popup from "../../../common/popups/end_tournament_popup";
import EndUnrankedTournament_popup from "../../../common/popups/end_unranked_tournament_popup";

export const Drabinka = (props) => {

    const [chosen_match, set_chosen_match] = useState(() => { return 1; } );

    let ladders = getLaddersFiltered(props.calendar_list.places, props.ladders_list.ladders["ALL"])

    let min_round = ladders[chosen_match][0].round_number.length;
    let max_round = ladders[chosen_match][ladders[chosen_match].length-1].round_number.length;
    let numOfCols = max_round - min_round + 1

    return (
        <>
            <Row>
                { props.calendar_list.approved == 2 ? <EndTournament_popup{...props}/> :  <EndUnrankedTournament_popup/>}
                <div>
                    <select value={chosen_match} onChange={(e) => set_chosen_match(e.target.value)}>
                        <option value="1">Drabinka główna</option>
                        <option value="5">5 miejsce</option>
                        {props.calendar_list.places === 16?
                            <>
                                <option value="9">9 miejsce</option>
                                <option value="15">15 miejsce</option>
                            </>
                            :null
                        }
                    </select>
                </div>
            </Row>
            <Row>
                <DrabinkaRound
                    net_round = {1}
                    current_round={min_round}
                    numOfCols={numOfCols}
                    ladders = {ladders}
                    chosen_match = {chosen_match}
                    calendar_list = {props.calendar_list}
                    user = {props.user}
                />
                {numOfCols >= 2?
                    <DrabinkaRound
                        net_round = {2}
                        current_round={min_round + 1}
                        numOfCols={numOfCols}
                        ladders = {ladders}
                        chosen_match = {chosen_match}
                        calendar_list = {props.calendar_list}
                        user = {props.user}
                    />:null
                }
                {numOfCols >= 3?
                    <DrabinkaRound
                        net_round = {3}
                        current_round={min_round + 2}
                        numOfCols={numOfCols}
                        ladders = {ladders}
                        chosen_match = {chosen_match}
                        calendar_list = {props.calendar_list}
                        user = {props.user}
                    />:null
                }
                {numOfCols >= 4?
                    <DrabinkaRound
                        net_round = {4}
                        current_round={min_round + 3}
                        numOfCols={numOfCols}
                        ladders = {ladders}
                        chosen_match = {chosen_match}
                        calendar_list = {props.calendar_list}
                        user = {props.user}
                    />:null
                }
            </Row>
        </>
    );
}

export default Drabinka;