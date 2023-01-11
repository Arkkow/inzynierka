// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import Button from 'react-bootstrap/Button';
import {Col} from "react-bootstrap";
import {getToken} from "../../../../api/api";



export const MyAllFilter = (props) => {

    let isViewMyTournaments = window.location.href.split("/")[3] === "myTournaments"

    return (
        <>
            {getToken() !== null ? (
                <Col
                    sm={12}
                    style={{
                        marginTop: "2%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    hi mom!

                    <Col
                        sm={6}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            className="btn btn-primary"
                            href="calendar"
                            style={{
                                maxHeight: "40px",
                                marginRight: "25px",
                                borderColor: "var(--medium_grey)",
                                backgroundColor: "white",
                                color: isViewMyTournaments?"var(--dark_grey)":"var(--black)",
                            }}
                        >
                            <my_h4>WSZYSTKIE</my_h4>
                        </Button>
                    </Col>

                    <Col
                        sm={6}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            className="btn btn-primary"
                            style={{
                                maxHeight: "40px",
                                borderColor: "var(--medium_grey)",
                                backgroundColor: "white",
                                color: isViewMyTournaments?"var(--black)":"var(--dark_grey)",
                            }}
                            href="myTournaments"
                        >
                            <my_h4>MOJE</my_h4>
                        </Button>

                    </Col>

                </Col>
            ):null
            }
        </>

    );
};

export default MyAllFilter;