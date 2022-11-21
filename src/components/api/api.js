function getToken(){
return "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7";
}
function makeReq(endpoint, method,body, dispatch){
// 	return new Promise(function(resolve) {
// 	   var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4) {
// 		if(this.status == 200){
// 		try{
//         resolve(JSON.parse(xhttp.responseText));
// 		}catch(e){
// 			        resolve(xhttp.responseText);
// 		}
//     }else{
// 		Promise.reject("error");
// 	}
// 	}
// };
// xhttp.open(method, "https://dragonmaster.pl/inz/"+endpoint);
// xhttp.send(body);
//
//   });
    fetch('https://dragonmaster.pl/inz/' + endpoint, {
      headers: {
        Authorization: ("Bearer " + getToken())
      },
      data: body,
      method: method,
    })

      .then((res) => {
          return dispatch({type: "DOWNLOAD_CALENDAR", payload: {data: res.json()}})
        }
      )
      .catch((err) => {console.log(err)});
}
function makeAuthedReq(endpoint, method,body){
// 		return new Promise(function(resolve) {
// 	   var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4) {
// 		if(this.status == 200){
// 		try{
//         resolve(JSON.parse(xhttp.responseText));
// 		}catch(e){
// 			        resolve(xhttp.responseText);
// 		}    }else{
// 		Promise.reject("error");
// 	}
// 	}
// };
// xhttp.open(method, "https://dragonmaster.pl/inz/"+endpoint);
// xhttp.setRequestHeader("Authorization","Bearer "+getToken());
// xhttp.send(body);

  return makeReq(endpoint, method,body);
}
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
  return makeReq("user/byId?id="+id,"POST",null);
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