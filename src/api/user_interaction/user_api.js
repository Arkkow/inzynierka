import {makeReq} from "../api.js"
import {makeAuthedReq} from "../api.js"

/*
ID
tournament id

OUTPUT
{
  "name": "string",
  "surname": "string"
}
*/
export function getUserById(id) {
    return makeReq("user/byId?id="+id,"GET");
}
/*
OUTPUT
{
  "id": "string",
  "name": "string",
  "surname": "string",
  "role": "1",
  "login": "string",
  "phone": "string",
  "mail": "string"
}
*/
export function getUser() {
    return makeAuthedReq("user","GET",null);
}

/* INPUT
{token}
*/

export function postToken(token) {
    return makeReq("user/verifymail","POST",JSON.stringify(
        {"token": token}));
}

/*
OUTPUT
{}
*/
export function putUser(body) {
    return makeReq("user/register","PUT",body);
}

export function getUserSettings() {
    return makeAuthedReq("user/settings","GET",null);
}

/*
INPUT
{}
*/
export function postUserSettings(input) {
    return makeAuthedReq("user/settings","POST",JSON.stringify(input));
}

/*
INPUT
{
  "name": "string",
  "surname": "string",
  "password": "string",
  "phone": "string",
  "mail": "string"
}

OUTPUT
"ok"
*/
export function postUser(input) {
    return makeAuthedReq("user","POST",JSON.stringify(input));
}