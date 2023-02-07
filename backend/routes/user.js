const express = require("express");
const router = express.Router();
const { db } = require("../firebase.js");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();
    const { favorite_github_users } = doc.data();
    if (!favorite_github_users) {
      const response = await userRef.update({
        favorite_github_users: [],
      });
    }
    res.status(200).send({ status: 200, data: doc.data() });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { likedUser } = req.body;

    const userRef = db.collection("users").doc(id);
    const doc = await userRef.get();

    const { favorite_github_users } = doc.data();
    if (!favorite_github_users) {
      const response = await userRef.update({
        favorite_github_users: [likedUser],
      });
      return res
        .status(200)
        .send({ status: 200, message: "successfully created field" });
    }
    if (favorite_github_users.some((user) => user.id == likedUser.id)) {
      const response = await userRef.update({
        favorite_github_users: favorite_github_users.filter(
          (user) => user.id != likedUser.id
        ),
      });
      return res
        .status(200)
        .send({ status: 200, message: "successfully disliked" });
    }
    const response = await userRef.update({
      favorite_github_users: [...favorite_github_users, likedUser],
    });
    return res.status(200).send({ status: 200, message: "successfully liked" });
  } catch (err) {
    console.log(err);
    res.status(500).send("failure");
  }
});

module.exports = router;
