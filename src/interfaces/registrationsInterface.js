export function getAll() {
   return [{"id":1,"partner":12,"payed":false},{"id":2,"partner":13,"payed":true}];
};
export function getById (id) {
    return {"id":id,"partner":12,"payed":false};
};
export function register (input) { //{"id":2,"partner":13}
alert("registering: "+input);
};
export function pay(id) {
alert("paying "+id);
};