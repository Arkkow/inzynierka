// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';


// CSS files
import {ButtonGroup, Col} from "react-bootstrap";



export const TournamentNavbar = (props) => {
    return (
        <>
            <style type="text/css">
                {`
    .btn-light2 {
      background: white;
      color: var(--black);
    }
    
    .btn-light2:hover {
      background: white;
    }
    
    .btn-light {
      color: var(--medium_grey);
    }

    `}
            </style>

        <Col sm={6} style={{display:"flex", justifyContent:"center"}}>
            <ButtonGroup style={{marginTop: "2%", marginBottom: "2%", width:"100%"}}>

                <Button
                        onClick={() => props.handleGOTO("info")}
                        variant={props.view.tournament_tab === "info"? 'light2' : 'light'}
                        style={{borderColor:"var(--medium_grey)", }}>
                    <my_h4>INFORMACJE</my_h4>
                </Button>

                <Button
                        onClick={() => props.handleGOTO("zapisy")}
                        variant={props.view.tournament_tab === "zapisy"? 'light2' : 'light'}
                        style={{borderColor:"var(--medium_grey)"}}>
                    <my_h4>ZAPISY</my_h4>
                </Button>

                <Button
                    onClick={() => props.handleGOTO("wyniki")}
                    variant={props.view.tournament_tab === "wyniki"? 'light2' : 'light'}
                    style={{borderColor:"var(--medium_grey)"}}>
                    <my_h4>WYNIKI</my_h4>
                </Button>
            </ButtonGroup>
        </Col>
        </>
    );
}

export default TournamentNavbar;