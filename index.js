const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
var app = express()
const UserController = require('./src/user/user.controller')
const ContactController = require('./src/contact/contact.controller')
require('./utils/db')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.post("/v1/user/message/add", UserController.reportUserRequest)
app.get("/v1/user/message/list", UserController.list)
app.post("/v1/user/contact/form", ContactController.contactForm)

app.listen(process.env.PORT || 6500, function () {
    console.log('App running on port ' + (process.env.PORT || 6500))
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});