import makeReq from "./api.js"
import makeAuthedReq from "./api.js"


/*
INPUT
{
  "ladderid": "string",
  "winner": "A",
  "score": "string"
}
OUTPUT
"ok"
*/
export function putProposal(input) {
    return makeAuthedReq("proposal","PUT",JSON.stringify(input));
}

/*
ID
id of proposal
OUTPUT
"ok"
*/
export function postAcceptProposal(id) {
    return makeAuthedReq("proposal/approve","POST",JSON.stringify({
        "id": id.toString()
    }));
}