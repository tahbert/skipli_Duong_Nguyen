const accountSid = "ACc5b50d6723c73dad7a556105cfacd3ad";
const authToken = "cdc968bddc6a0a407f07ef4b722a86c9";

const client = require("twilio")(accountSid, authToken);

module.exports = { client };
