// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import Button from "react-bootstrap/Button";
import {approveTournamentAdmin, rejectTournamentAdmin} from "../../../../../api/admin/tournament_admin_api"
import {Col, Row} from "react-bootstrap";

export const TournamentRanked = (props) => {

    return (
        <>
            { props.approved === 1 && ((props.user.role === "2" && props.creator === props.user.id) || props.user.role === "3") ? (
                <Col>
                    <Row style={{display:"flex", textAlign:"center"}}>
                        <paragraph>Czy chcesz uczynić turniej rankingowym?</paragraph>
                    </Row>

                    <Row style={{display:"flex", flexDirection:"row"}}>
                        <div style={{display:"flex", justifyContent:"center"}}>

                            {/*{*/}
                            {/*    props.handleDownloadAuthedCalendar()*/}
                            {/*}*/}

                            <Button variant="success" style={{ margin: "5%", display:"flex", justifyContent:"center", alignItems:"center" }}
                                    onClick={() => approveTournamentAdmin(props.id)
                                        .then(props.refreshProps)}>
                                <paragraph_sb>TAK</paragraph_sb>
                            </Button>

                            <Button variant="danger" style={{ margin: "5%" , display:"flex", justifyContent:"center", alignItems:"center", minHeight:"35px"}}
                                    onClick={() => rejectTournamentAdmin(props.id)
                                        .then(props.refreshProps)
                            }>
                                <paragraph_sb>NIE</paragraph_sb>
                            </Button>

                        </div>
                    </Row>
                </Col>
            )
                : null
            }
        </>
    );
}

export default TournamentRanked;