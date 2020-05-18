var express = require("express");
var Mailgun = require("mailgun-js");

var router = express.Router();
var api_key = process.env.API_KEY;
var domain = process.env.DOMAIN;
var sender = process.env.SENDER;

router.route("/").get(function (req, res) {
  res.status(404).send("Please send a post request");
});

router.route("/submit/:mail").post(function (req, res) {
  console.log("form submitted");

  var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
  var name = req.body.name,
    email = req.body.email,
    subject = req.body.subject,
    htmlBody = req.body.htmlBody;

  if (name !== undefined) {
    sender = name + "<" + "admin@billyjacoby.com" + ">";
  } else {
    sender = "No Name Provided<" + "admin@billyjacoby.com" + ">";
  }

  var data = {
    from: sender,
    "h:Reply-To": email,
    to: req.params.mail,
    subject: subject,
    html: htmlBody,
  };

  console.log(JSON.stringify(data, undefined, 2));

  mailgun.messages().send(data, function (err, body) {
    if (err) {
      res.status(502).send("error");
      console.log("Error trying to send email: ", err);
    } else {
      res.status(200).send("OK");
    }
  });
});

module.exports = router;
