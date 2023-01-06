// General React imports
import * as React from 'react';
import { useState } from 'react';

// Project specific files
import {deleteTournamentAdmin} from "../../../../../api/admin/tournament_admin_api";

// CSS files
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dropdown, Row} from "react-bootstrap";



export const CalendarAdminDropdown = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <style type="text/css">
                {`
    .dropdown-item:active {
      background: var(--pfp_green);
      color: white;
    }
    `}
                </style>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><></></Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    <my_h4>Czy na pewno chcesz usunąć poniższy turniej?</my_h4>
                    <br/>
                    <big_para>{props.name}</big_para>
                </Modal.Body>
                <Modal.Footer style={{display:"flex", justifyContent:"center"}}>
                    <Button variant="secondary" onClick={handleClose}  style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "white",
                        borderRadius: "13px",
                        paddingRight:"15px",
                        paddingLeft:"15px"
                    }}>
                        NIE
                    </Button>
                    <Button variant="danger" onClick={() => deleteTournamentAdmin(String(props.id)).then(() => window.location.reload(false))}  style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "white",
                        borderRadius: "13px",
                        paddingRight:"15px",
                        paddingLeft:"15px"
                    }}>
                        TAK, USUŃ
                    </Button>
                </Modal.Footer>
            </Modal>

        <Row style={{display:"flex", justifyContent:"end", marginBottom:"10px"}}>
            {props.user.role === "3" || (props.user.id === props.creator)?
                <Dropdown style={{width:"0px", paddingRight:"40px"}}>
                    <Dropdown.Toggle variant="secondary" ></Dropdown.Toggle>
                    <Dropdown.Menu variant="secondary">
                        <Dropdown.Item {...props} href={"edit_tournament"+"?id="+props.id}>
                            Edytuj informacje
                        </Dropdown.Item>
                        {props.user.role === "3"?
                            <Dropdown.Item
                                onClick={handleShow}>
                                Usuń turniej
                            </Dropdown.Item>
                            :null
                        }
                    </Dropdown.Menu>
                </Dropdown>:
                null
            }
        </Row>
        </>
    );
}

export default CalendarAdminDropdown;