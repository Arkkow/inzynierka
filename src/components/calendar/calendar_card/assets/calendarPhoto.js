// General React imports
import * as React from 'react';
import {getImage} from "../../../api/tournament/tournament_CRUD_api.js";

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
<img  style={{height: "80px", width: "80px", borderRadius:"8px"}} src={(props.hasImage == 0 ?cup_logo:"https://dragonmaster.pl/inz/tournament/image?id="+props.id)} alt={""} />
            </div>
        </>
    );
}

export default CalendarPhoto;