import React from 'react';
import Button from 'react-bootstrap/Button';
import "../../styles/App.css"

function Logout() {

    return (
            <Button style={{
                fontFamily: 'Montserrat',
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "25px",
                color: "white",
                borderRadius: "15px",
                paddingRight: "1.5%",
                paddingLeft: "1.5%",
                paddingBottom: "0.5%",
                paddingTop: "0.5%",
                marginRight: "1%"
            }} variant="success" >
                WYLOGUJ
            </Button>

    );
}


export default Logout;




