// General React imports
import * as React from 'react';
import {useState} from "react";

// Project specific files
import {postAcceptInvite, postRejectInvite} from "../../api/user_interaction/invitation_api";
import {getPendingApprovals} from "../../api/api";

// CSS files
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


const invitation = getPendingApprovals();
invitation.then((value) => {
    for (let i = 0; i < value.length; i++) {
        console.log(value[i]);
    }
});

export const PlayerInvitation = (props) => {
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
                        {invitation.tournament === props.id ? (
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

export default PlayerInvitation;