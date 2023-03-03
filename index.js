const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

/**
 * You should actually store your JWT secret in your .env file -
 * but to keep this example as simple as possible.
 */
const jwtsecret = "mysecret";

app.use(express.json());

app.use(express.static("public"));

app.listen(3000);

app.post("/login", (req, res) => {
  if (req.body.username === "Salem Nabeel" && req.body.password === "12345") {
    res.status(200);

    res.json({
      status: "success",
      token: jwt.sign(
        { name: "Salem Nabeel", address: "Aden City" },
        jwtsecret
      ),
    });
  } else {
    res.status(401);

    res.json({ status: "failure" });
  }
});

app.post("/info", (req, res) => {
  jwt.verify(req.body.token, jwtsecret, function (error, decoded) {
    if (error) {
      res.status(401);

      res.json({ status: "failure" });
    } else {
      res.status(200);

      res.json({
        status: "success",
        message: `Hello ${decoded.name} your address is ${decoded.address}.`,
      });
    }
  });
});
