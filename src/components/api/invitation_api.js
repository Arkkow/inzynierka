import makeReq from "./api.js"
import makeAuthedReq from "./api.js"

/*
ID
od of user
*/
export function postAcceptInvite(id) {
    return makeAuthedReq("acceptInvite","POST",	JSON.stringify({
        "id": id.toString()
    }));
}

/*
ID
od of user
*/
export function postRejectInvite(id) {
    return makeAuthedReq("rejectInvite","POST",JSON.stringify({
        "id": id.toString()
    }));
}

/*
OUTPUT
[
  {
    "id": "string",
    "ladderid": "string",
    "winner": "A",
    "score": "string",
    "proposer": 0,
    "approver": 0
  }
]
*/
export function getPendingProposals() {
    return makeAuthedReq("proposals/pending","GET",null);
}
