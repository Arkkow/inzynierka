import {makeAuthedReq} from "../api.js"

/*
ID
id of regiostartion
OUTPUT
{
  "status": "string"
}
*/
export function getRegistrationPaymentStatus(id) {
    return makeAuthedReq("registration/paymentstatus?id="+id ,"GET",null);
}

/*
INPUT
{
  "id": "string",
  "ownerOrInvited": "owner"
}
*/

export function postPayedUsingCash(input) {
    return makeAuthedReq("registration/payedUsingCash" ,"POST",JSON.stringify(input));
}

/*
INPUT
{
  "id": "string",
  "paymentmethod": "cash"
}
OUTPUT
{
  "url": "string" //optional
}
*/
export function postPayForRegistration(input) {
    return makeAuthedReq("payForRegistration","POST",JSON.stringify(input));
}
