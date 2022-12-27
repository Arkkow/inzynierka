// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import { Dropdown, Row} from "react-bootstrap";
import {deleteTournamentAdmin} from "../../../api/admin/tournament_admin_api";



export const CalendarAdminDropdown = (props) => {

    return (
        <Row>
            {props.user.role === "3" || (props.user.id === props.creator)?
                <Dropdown>
                    <Dropdown.Toggle variant="secondary"></Dropdown.Toggle>
                    <Dropdown.Menu variant="secondary">
                        <Dropdown.Item {...props} href={"edit_tournament"+"?id="+props.id}>
                            Edytuj
                        </Dropdown.Item>
                        {props.user.role === "3"?
                            <Dropdown.Item onClick={() => deleteTournamentAdmin(String(props.id)).then(() => window.location.reload(false))}>
                                Usuń turniej
                            </Dropdown.Item>
                            :null
                        }
                    </Dropdown.Menu>
                </Dropdown>:
                null
            }
        </Row>
    );
}

export default CalendarAdminDropdown;