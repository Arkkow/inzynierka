// General React imports
import * as React from 'react';
import {useEffect, useState} from "react";

// Project specific files

// CSS files
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {postAcceptInvite, postRejectInvite} from "../../../../../api/user_interaction/invitation_api";
import {getPendingApprovals} from "../../../../../api/api";



export const CalendarInvitation = (props) => {
    const [invitations, setInvitations] = useState({ fetched: false, data: [] });

    // useEffect(() => props.getAllPendingApprovals(),[])


    if (invitations.fetched === false) {
        getPendingApprovals()
            .then((dane) => {
            setInvitations({ fetched: true, data: dane });
        });
    }

    return (
        <>
            {invitations.fetched === false ? null:
                (
                    invitations.data.map((invitation) => (
                        <Col sm={12}>
                            {invitation.id === props.id ? (

                                <Card.Text>
                                    <div style={{ textAlign: "center" }}>
                                        {props.name1} {props.surname1} zaprosił/a cię do gry
                                    </div>

                                    <div style={{ textAlign: "center" }}>
                                        <Button variant="success" style={{ margin: "5%" }}
                                                onClick={() => postAcceptInvite(invitation.id).then(() =>
                                                    getPendingApprovals()
                                                        .then((dane) => {
                                                            setInvitations({ fetched: true, data: dane });
                                                        }))}>
                                            TAK
                                        </Button>
                                        <Button variant="danger" style={{ margin: "5%" }}
                                                onClick={() =>
                                                    postRejectInvite(invitation.id).then(() => getPendingApprovals()
                                                        .then((dane) => {
                                                            setInvitations({ fetched: true, data: dane });
                                                        }))
                                                    }>
                                            NIE
                                        </Button>
                                    </div>
                                </Card.Text>
                            ) : null}
                        </Col>
                    ))
                )}
        </>
    );
}

export default CalendarInvitation;