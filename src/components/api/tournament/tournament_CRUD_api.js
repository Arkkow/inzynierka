import {makeReq} from "../api.js"
import {makeAuthedReq} from "../api.js"

/** GET **/
/*
OUTPUT
[
  {
    "id": "string",
    "name": "string",
    "typeOfLadder": "string",
    "pointsForTournament": "string",
    "places": "string",
    "approved": "string",
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
export function getTournaments() {
    return makeReq("tournaments","GET",null);
}

/** POST (CREATE NEW) **/
/*
INPUT
{
  "id": "string", //required
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

OUTPUT
{}
*/
export function postTournaments(input) {
    return makeAuthedReq("tournament","POST",JSON.stringify(input));
}

/** PUT (EDIT) **/
/*
INPUT
{
  "name": "string",
  "typeOfLadder": "string",
  "pointsForTournament": "1",
  "places": "1",
  "ranked": "0",
  "place": "place",
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

OUTPUT
{"id":"1234"}
*/
export function putTournaments(input) {
    return makeAuthedReq("tournament","PUT",JSON.stringify(input));
}

/** POST IMAGE **/
/*
ID
tournament id
IMAGE
bytes of image
OUTPUT
"ok"
*/
export function postImage(id,image) {
    return makeAuthedReq("tournament/image?id="+id,"POST",image);
}

/** START **/

/*
ID
id of tournamnet

OUTPUT
"ok"
*/
export function startTournament(id) {
    return makeAuthedReq("tournament/startTournament","POST",JSON.stringify({
        "id": id.toString()
    }));
}

/** END **/

/*
INPUT
{
  "id": "123",
    "results": [ // when ranked
    {
      "rid": 0,
      "points": 0
    }
  ]
}

OUTPUT
"ok"
*/
export function endTournament(input) {
    return makeAuthedReq("tournament/endTournament","POST",JSON.stringify(input));
}


/** DELETE **/
/*
ID
id of tournamnet


OUTPUT
"ok"
*/
export function deleteTournaments(id) {
    return makeAuthedReq("tournament","DELETE",JSON.stringify({
        "id": id.toString()
    }));
}

/** CANCEL **/
/*
ID
id of tournamnet

OUTPUT
"ok"
*/
export function cancelTournament(id) {
    return makeAuthedReq("tournament/cancelTournament","POST",JSON.stringify({
        "id": id.toString()
    }));
}