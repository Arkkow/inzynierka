import {makeAuthedReq} from "./api.js"

/*
ID
id of tournament
OUTPUT
[
  {
    "id": "string",
    "userid": "string",
    "tournamentid": "string",
    "paymenttype": "string",
    "paymentstatus": "string",
    "approvals": "string"
  }
]
*/
export function getRegistrations(id) {
    return makeAuthedReq("registrations?id="+id ,"GET",null);
}

/*
INPUT
{
  "tournament": "1",
  "partner": "1"
}
OUTPUT
{
  "id": "string"
}
*/
export function putRegistration(input) {
    return makeAuthedReq("registration" ,"PUT",JSON.stringify(input));
}


/*
id
id of registartion
*/
export function postRegistrationApprove(id) {
    return makeAuthedReq("registration/approve" ,"POST",JSON.stringify({
        "id": id.toString()
    }));
}

/*
OUTPUT
[
    {
        "id": 41014,
        "name": "string",
        "typeOfLadder": "string",
        "pointsForTournament": 1,
        "places": 1,
        "creator": 803,
        "approved": 0,
        "state": 0,
        "currentRound": 0,
        "from": "2022-01-01",
        "to": "2022-01-01",
        "place": "place",
        "categotry": "cat1",
        "rang": "rang1",
        "entryFee": 5,
        "director": "name",
        "phone": "123123",
        "entriesTo": "2022-01-01",
        "additionalInformations": "info",
        "visibility": "TRUE"
    }
]
*/
export function getUserRegistrations() {
    return makeAuthedReq("user/myRegistrations" ,"GET",null);
}

/*
ID
id of tournamnet

OUTPUT
"ok"
*/
export function closeRegistrations(id) {
    return makeAuthedReq("tournament/closeRegistrations","POST",JSON.stringify({
        "id": id.toString()
    }));
}