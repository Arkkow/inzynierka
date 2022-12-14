// General React imports
import * as React from 'react';
import {useState} from "react";

// Project specific files

// CSS files
import {Col} from "react-bootstrap";
import {getPendingApprovals} from "../../../api/api";



export const CalendarInvitation2 = (props) => {
    const [invitations, setInvitations] = useState({ fetched: false, data: [] });
    if (invitations.fetched === false) {
        getPendingApprovals().then((dane) => {
            setInvitations({ fetched: true, data: dane });
        });
    }
    let x = false;
    return (
        <>
            {invitations.fetched === false ? null:
                (
                    invitations.data.map((invitation) => (
                        <Col sm={12}>
                            {invitation.tournament == props.id ? (
                                x = true
                                ) : null}
                        </Col>
                    ))
                )}
            {x === true ? "Masz zaproszenie na ten turniej!" : null}
        </>
    );
}

export default CalendarInvitation2;