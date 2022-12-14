// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import { Dropdown, Row} from "react-bootstrap";



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
                        <Dropdown.Item>
                            Action 2
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>:
                null
            }
        </Row>
    );
}

export default CalendarAdminDropdown;