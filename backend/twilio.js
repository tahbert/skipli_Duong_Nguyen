// twilio
const accountSid = "ACc5b50d6723c73dad7a556105cfacd3ad";
const authToken = "7f183e8258eb661f67bbbf857c76812a";
const client = require("twilio")(accountSid, authToken);

module.exports = { client };
