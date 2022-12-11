// General React imports
import * as React from 'react';
import {useState} from "react";

// Project specific files

// CSS files
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {postAcceptInvite, postRejectInvite} from "../../../api/user_interaction/invitation_api";
import {getPendingApprovals} from "../../../api/api";



export const CalendarInvitation = (props) => {
    const [invitations, setInvitations] = useState({ fetched: false, data: [] });
    if (invitations.fetched === false) {
        getPendingApprovals().then((dane) => {
            setInvitations({ fetched: true, data: dane });
        });
    }

    return (
        <>
            {invitations.fetched === false ? null:
                (
                    invitations.data.map((invitation) => (
                        <Col sm={2}>
                            {invitation.tournament == props.id ? (
                                <Card.Text>
                                    <div style={{ textAlign: "center" }}>
                                        Użytkownik {invitation.inviter} cię do gry w tym turnieju
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <Button variant="success" style={{ margin: "5%" }} onClick={() => postAcceptInvite(invitation.id)}>
                                            TAK
                                        </Button>
                                        <Button variant="danger" style={{ margin: "5%" }} onClick={() => postRejectInvite(invitation.id)}>
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