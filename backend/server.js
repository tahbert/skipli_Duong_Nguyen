const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.get("/", async (req, res) => {
  const numberRef = db.collection("people");
  const snapshot = await numberRef.where("number", "==", "+84963630368").get();
  let data = [];
  snapshot.forEach((doc) => data.push(doc.data()));
  res.send({ message: data });
});

const loginRouter = require("./routes/login.js");
app.use("/login", loginRouter);

const userRouter = require("./routes/user.js");
app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("alive");
});
