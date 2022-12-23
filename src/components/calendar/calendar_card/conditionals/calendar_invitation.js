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
import {getUserById} from "../../../api/user_interaction/user_api";



export const CalendarInvitation = (props) => {
    const [invitations, setInvitations] = useState({ fetched: false, data: [] });
    // const [users, setUsers] = useState({ fetched: false, data: [] });
    // const id = window.location.href.split('?')[1].split('=')[1];
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
                        <Col sm={12}>
                            {invitation.id === props.id ? (

                                <Card.Text>
                                    <div style={{ textAlign: "center" }}>
                                        {props.name1} {props.surname1} zaprosił cię do gry

                                        {/*{(getUserById(invitation.inviter).then()=>setUsers)}*/}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <Button variant="success" style={{ margin: "5%" }} onClick={() => postAcceptInvite(invitation.id).then(() => window.location.reload(false))}>
                                            TAK
                                        </Button>
                                        <Button variant="danger" style={{ margin: "5%" }} onClick={() => postRejectInvite(invitation.id).then(() => window.location.reload(false))}>
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