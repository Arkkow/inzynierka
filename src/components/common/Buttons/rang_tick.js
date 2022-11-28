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
                    <CheckCircleFill color={"gold"}/>:
                props.rang === 'MASTER'?
                    <CheckCircleFill color={"silver"}/>:
                props.rang === 'PFP OPEN'?
                    <CheckCircleFill color={"royalblue"}/>:
                    <CheckCircle/>
            }
            </OverlayTrigger>
        </>
    );
}

export default RangTick;