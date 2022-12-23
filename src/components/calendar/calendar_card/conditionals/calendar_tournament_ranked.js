// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {approveTournamentAdmin, rejectTournamentAdmin} from "../../../api/admin/tournament_admin_api";



export const TournamentRanked = (props) => {

    return (
        <>
            { props.approved === 1 && ((props.user.role === "2" && props.creator === props.user.id) || props.user.role === "3") ? (
                <Card.Text>
                    <div style={{ textAlign: "center" }}>
                        Czy chcesz uczynić turniej rankingowym?
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button variant="success" style={{ margin: "5%" }} onClick={() => approveTournamentAdmin(props.id).then(() => window.location.reload(false))}>
                            TAK
                        </Button>
                        <Button variant="danger" style={{ margin: "5%" }} onClick={() => rejectTournamentAdmin(props.id).then(() => window.location.reload(false))}>
                            NIE
                        </Button>
                    </div>
                </Card.Text>
            )
                : null
            }
        </>
    );
}

export default TournamentRanked;