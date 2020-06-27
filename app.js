//jshint esversion:6



const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});



app.post("/", function (req, res) {
    var fname = req.body.fName;
    var lname = req.body.lName;
    var email = req.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    var JSONData = JSON.stringify(data);
    var options = {
        url: "https://us10.api.mailchimp.com/3.0/lists/0cbbf3c449",
        method: "POST",
        headers: {
            "Authorization": "Bharat a30f551286517227803bb0420cc00250-us10"
        },
        body: JSONData
    };
    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        }
        else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});
app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {

    console.log("Server is running on port 3000");
});


//a30f551286517227803bb0420cc00250-us10

//0cbbf3c449