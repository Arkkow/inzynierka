import makeReq from "../api.js"
import makeAuthedReq from "../api.js"

/*
OUTPUT
[
  {
    "id": "string",
    "name": "string",
    "surname": "string",
    "role": "string",
    "login": "string",
    "phone": "string",
    "mail": "string",
    "deleted": "string"
  }
]
*/
export function getUsersAdmin() {
    return makeAuthedReq("admin/users","GET",null);
}

/*
ID
user id
*/
export function deleteUserAdmin(id) {
    return makeAuthedReq("admin/user","DELETE",JSON.stringify({"id":id}));
}

/*
INPUT
{
  "id": "string",
  "name": "string",
  "surname": "string",
  "password": "string",
  "phone": "string",
  "mail": "string",
  "role": "1"
}
*/
export function postUserAdmin(input) {
    return makeAuthedReq("admin/user","POST",JSON.stringify(input));
}