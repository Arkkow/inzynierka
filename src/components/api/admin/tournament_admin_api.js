import {makeAuthedReq} from "../api.js"

/*
OUTPUT
[
  {
    "id": "string",
    "name": "string",
    "typeOfLadder": "string",
    "pointsForTournament": "string",
    "places": "string",
    "roles": "string",
    "approved": "string",
    "deleted": "string",
    "from": "string",
    "to": "string",
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
*/
export function getTournamentsAdmin(input) {
    return makeAuthedReq("admin/tournaments","GET",null);
}

/*
INPUT
{
  "id": "string",
  "name": "string",
  "typeOfLadder": "string",
  "pointsForTournament": "string",
  "places": "string",
  "roles": "string",
  "from": "string",
  "to": "string",
  "rang": "rang1",
  "entryFee": "5",
  "director": "name",
  "phone": "123123",
  "entriesTo": "string",
  "additionalInformations": "info",
  "categotry": "cat1",
  "visibility": "TRUE"
}
*/
export function postTournamentAdmin(input) {
    return makeAuthedReq("admin/tournament","POST",JSON.stringify(input));
}

/*
ID
tournament id
*/
export function deleteTournamentAdmin(id) {
    return makeAuthedReq("admin/tournament","DELETE",JSON.stringify({
        "id": id
    }));
}

/*
ID
tournament id
*/
export function approveTournamentAdmin(id) {
    return makeAuthedReq("admin/approveTurnament","POST",JSON.stringify({
        "id": String(id)
    }));
}

/*
ID
tournament id
*/
export function rejectTournamentAdmin(id) {
    return makeAuthedReq("admin/rejectTurnament","POST",JSON.stringify({
        "id": String(id)
    }));
}