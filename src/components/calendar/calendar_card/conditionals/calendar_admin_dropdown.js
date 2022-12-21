// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import { Dropdown, Row} from "react-bootstrap";
import {deleteTournaments} from "../../../api/tournament/tournament_CRUD_api";
import {deleteTournamentAdmin} from "../../../api/admin/tournament_admin_api";



export const CalendarAdminDropdown = (props) => {

    return (
        <Row>
            {props.user.id === props.creator?
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">...</Dropdown.Toggle>
                    <Dropdown.Menu variant="secondary">
                        <Dropdown.Item {...props} href={"edit_tournament"+"?id="+props.id}>
                            Edytuj
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteTournamentAdmin(String(props.id)).then(() => window.location.reload(false))}>
                            Usuń turniej
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>:
                null
            }
        </Row>
    );
}

export default CalendarAdminDropdown;