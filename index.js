var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/"))); // Assuming index.html is in the root directory

// Routing
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send_email", function(req, res) {
    var name = req.body.name;
    var to = 'lifeontheedge224@gmail.com';
    var subject = 'Queries and Feedbacks';
    var message = req.body.message;
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'technotrons01@gmail.com',
            pass: 'ggmbtktevbqtglxe'
        }
    });
    
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: name + '\n' + message // Concatenating name and message with a newline
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send("Error sending email"); // Sending error response
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully"); // Sending success response
        }
    });
});

// Initialize Web Server
server.listen(port, function() {
    console.log("Starting Server on port: " + port);
});
