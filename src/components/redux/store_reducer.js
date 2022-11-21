// General react imports
import {combineReducers} from "redux";

const default_state = {
        calendar_content: {
            data: [
                {
                    "id": "1",
                    "name": "Turniej bez bazy",
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
        profile_content: {},
        user_content: {
            data: {
                role: "default"
                //"tu będzie puste na razie, to jest default, to się nadpisze"
            }
        }
};

//Obsługa zmiany stanu
export const calendar_content = (state = default_state.calendar_content, action) => {
    switch(action.type){
        case "DOWNLOAD_CALENDAR":
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
};

export const user_content = (state = default_state.user_content, action) => {
    switch(action.type){
        case "DOWNLOAD_USER":
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
};

//W przypadku wielu stanów dodaje kolejną warstwę struktury - head reducer, który zarządza reducerami
export default combineReducers({calendar_content, user_content});