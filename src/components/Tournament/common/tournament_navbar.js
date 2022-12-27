// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';


// CSS files
import {ButtonGroup, Col} from "react-bootstrap";



export const TournamentNavbar = (props) => {
    return (
        <Col sm={6}>
            <ButtonGroup style={{marginTop: "0.5%", marginBottom: "0.5%"}}>

                <Button
                        onClick={() => props.handleGOTO("info")}
                        variant="light"
                        style={{borderColor:"var(--medium_grey)"}}>
                    <my_h4>INFORMACJE</my_h4>
                </Button>

                <Button
                        onClick={() => props.handleGOTO("zapisy")}
                        variant="light"
                        style={{borderColor:"var(--medium_grey)"}}>
                    <my_h4>ZAPISY</my_h4>
                </Button>

                <Button
                    onClick={() => props.handleGOTO("wyniki")}
                    variant="light"
                    style={{borderColor:"var(--medium_grey)"}}>
                    <my_h4>WYNIKI</my_h4>
                </Button>
            </ButtonGroup>
        </Col>
    );
}

export default TournamentNavbar;