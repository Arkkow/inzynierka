import makeReq from "./api.js"
import makeAuthedReq from "./api.js"

/*
INPUT
{
  "tournamentid": "string",
  "inAtype": "R",
  "inA": "string",
  "inBtype": "R",
  "inB": "string",
  "round": "string"
}
OUTPUT
"ok"
*/
export function putLadder(input) {
    return makeAuthedReq("ladder","PUT",JSON.stringify(input));
}

/*
INPUT
{
  "id": "string",
  "inAtype": "R",
  "inA": "string",
  "inBtype": "R",
  "inB": "string",
  "round": "string",
  "winner": "string",
  "scores": "string"
}
OUTPUT
"ok"
*/
export function postLadder(input) {
    return makeAuthedReq("ladder","POST",JSON.stringify(input));
}

/*
ID
id of ladder
OUTPUT
"ok"
*/
export function deleteLadder(id) {
    return makeAuthedReq("ladder","DELETE",JSON.stringify({
        "id": id.toString()
    }));
}

/*
tournamentid
id of tournamnt
OUTPUT
[
  {
    "id": "string",
    "inAtype": "R",
    "inA": "string",
    "inBtype": "R",
    "inB": "string",
    "round": "string",
    "winner": "string",
    "scores": "string",
    "tournamentid": "string"
  }
]
*/
export function getladders(tournamentid) {
    return makeAuthedReq("ladders/raw?tournamentid="+tournamentid,"GET",null);
}
/*
tournamentid
id of ladder
OUTPUT
{
  "id": "string",
  "inAtype": "R",
  "inA": "string",
  "inBtype": "R",
  "inB": "string",
  "round": "string",
  "winner": "string",
  "scores": "string",
  "tournamentid": "string"
}
*/
export function getLaddersSolved(id) {
    return makeAuthedReq("ladders/raw?id ="+id ,"GET",null);
}