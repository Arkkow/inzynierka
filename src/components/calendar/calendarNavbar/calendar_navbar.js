// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";

// CSS files



export const CalendarNavbar = (props) => {
    return (
        <div style={{background: "white", maxWidth: "40%", margin: "auto", padding: "1%", textAlign:"center"}}>
            <div>
                <input type="date" style={{margin: "1%"}} />
                <input type="date" style={{margin: "1%"}}/>
                <Form.Control type="date" placeholder="Start Date" />
            </div>
            <div>

                <Button variant="outline-secondary" disabled={true} style={{margin: "1%"}}>WSZYSTKIE</Button>
                <Button variant="outline-secondary" disabled={false} style={{margin: "1%"}}>MOJE</Button>
            </div>
        </div>
    );
}

export default CalendarNavbar;