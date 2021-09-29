const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose= require('mongoose')
const app = express();
var route = express.Router();
const profile = require('./routes/profileRouter');
const mongooseUrl = "mongodb+srv://admin:Isai5440@cluster0.hqfxb.mongodb.net/EasyVolunteer?retryWrites=true&w=majority"

const port = 8000;


//Allow pre-flight checks
const corsOptions = {
    origin: '*'
}

app.use(cors());

app.use(bodyParser.json())

app.use('/', profile);

app.listen(port, () => {
    console.log(`Web Service Listening on port ${port}`)
    console.log(`Connecting to MongoDB on: ${mongooseUrl}`)
    mongoose.connect(mongooseUrl, {useUnifiedTopology: true, useNewUrlParser: true})
})