// General React imports
import * as React from 'react';
import {getImage} from "../../../api/tournament/tournament_CRUD_api.js";

// Project specific files

// CSS files
import cup_logo from "../../../../assets/cup.svg";

export const CalendarPhoto = (props) => {
	   var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
		if(this.status === 200){
			if(this.response.size !=0){
				this.response.arrayBuffer().then((a)=>{
									    let binary = '';
let bytes = new Uint8Array(a);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
			document.getElementById("tid_"+props.id).src="data:image/gif;base64,"+btoa(binary) ;
				});

			}
			
    }else{
	}
	}
};
xhttp.responseType = "blob";
xhttp.open("GET", "https://dragonmaster.pl/inz/tournament/image?id="+props.id);
xhttp.send(); 


    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                height: "100%",
                alignItems: "center"
            }}>
<img id={"tid_"+props.id} style={{height: "80px", width: "80px"}} src={cup_logo} alt={""} />
            </div>
        </>
    );
}

export default CalendarPhoto;