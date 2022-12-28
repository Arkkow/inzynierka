// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import { Row } from "react-bootstrap";
import DrabinkaRound from "./drabinka_round";
import {useState} from "react";


export const Drabinka = (props) => {


    const [chosen_match, set_chosen_match] = useState(() => {
        const chosen_match = 1;
        return chosen_match;
    });

    // let chosen_match = ladderValue;

    let ladders = {
        1: props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1" || e.round_number === "1W" || e.round_number === "1WW" || e.round_number === "1WWW"),
        5: props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1W" || e.round_number === "1WL" || e.round_number === "1WLW"),
        9: props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1L" || e.round_number === "1LW" || e.round_number === "1LWW"),
    };

    let min_round = ladders[chosen_match][0].round_number.length;
    let max_round = ladders[chosen_match][ladders[chosen_match].length-1].round_number.length;
    let numOfCols = max_round - min_round + 1

    return (
        <>
            <Row>
                <div>
                    <select value={chosen_match} onChange={(e) => set_chosen_match(e.target.value)}>
                        <option value="1">Drabinka główna</option>
                        <option value="5">5 miejsce</option>
                        <option value="9">9 miejsce</option>
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