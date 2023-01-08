import React from 'react';
import {CheckCircle, CheckCircleFill} from "react-bootstrap-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export const RangTick = (props) => {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <div>
                {props.rang}
            </div>

        </Tooltip>
    );

    return (
        <>

            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(props)}
            >
            {
                props.rang === 'CHALLENGER'?
                    <CheckCircleFill color={"#70a43c"}/>:
                props.rang === 'MASTER'?
                    <CheckCircleFill color={"#c7cb00"}/>:
                    <CheckCircleFill color={"gray"}/>
            }
            </OverlayTrigger>
        </>
    );
}

export default RangTick;