const express = require("express");
const router = express.Router();
const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../firebase.js");
const { client } = require("../twilio.js");

router.post("/", async (req, res, next) => {
  const { number } = req.body;
  try {
    const phoneNumberRef = db.collection("users").doc(number);
    const AccessCode = Math.floor(Math.random() * 899999 + 100000);
    const response = await phoneNumberRef.set(
      {
        phoneNumber: number,
        accessCode: AccessCode,
      },
      { merge: true }
    );
    const otp = await client.messages
      .create({
        body: `Your Access Code is ${AccessCode}`,
        from: "+19253877430",
        to: number,
      })
      .then((message) => console.log(message))
      .catch(() => {
        return res.status(500).send({ otpCreated: false });
      });
    res.status(200).send({ otpCreated: true });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const CodeReq = req.body.accessCode;
  try {
    const phoneNumberRef = db.collection("users").doc(id);
    const doc = await phoneNumberRef.get();
    const { phoneNumber, accessCode } = doc.data();
    if (phoneNumber != id || accessCode != CodeReq) {
      return res.status(500).send({ status: 200, message: "Wrong OTP" });
    }
    const response = await phoneNumberRef.update({
      accessCode: FieldValue.delete(),
    });
    res.status(200).send({ status: 200, message: "Successfully log in" });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
