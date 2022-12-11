// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import cup_logo from "../../../../assets/cup.svg";

export const CalendarPhoto = (props) => {

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                height: "100%",
                alignItems: "center"
            }}>
                <img src={cup_logo} alt={""} />
            </div>
        </>
    );
}

export default CalendarPhoto;