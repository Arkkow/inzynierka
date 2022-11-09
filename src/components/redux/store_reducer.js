// General react imports
import {combineReducers} from "redux";

const default_state = {
        calendar_content: {
            data: [
                {
                    "id": "1",
                    "name": "Turniej majowy",
                    "typeOfLadder": "string",
                    "pointsForTournament": "string",
                    "places": "Poznań",
                    "roles": "string",
                    "approved": "string",
                    "from": "24 listopada 2023",
                    "to": "27 listopada 2023",
                    "rang": "rang1",
                    "entryFee": "5",
                    "director": "name",
                    "phone": "123123",
                    "entriesTo": "string",
                    "additionalInformations": "info",
                    "categotry": "cat1",
                    "visibility": "TRUE"
                }
            ]
        },
        profile_content: {}
};

//Obsługa zmiany stanu
export const store_reducer_function = (state = default_state.calendar_content, action) => {
    switch(action.type){
        case "DOWNLOAD_CALENDAR":
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
};


//W przypadku wielu stanów dodaje kolejną warstwę struktury - head reducer, który zarządza reducerami
export default combineReducers({store_reducer_function});