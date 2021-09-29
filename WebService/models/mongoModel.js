const mongoose = require('mongoose')

const data = mongoose.Schema({
    profile : [{
        name: String,
        lastName: String,
        profileType: String,
        createdDate: Date,
        email: String,
        password: String,
        connection:{
            lat: String,
            long: String,
            status: String
        },
        reviews:[{
            starts: Number,
            comments: String,
            createdBy: String,
            createdDate: Date
        }],
        voluntaring:[{
            benefited: String,
            createdDate : Date,
            finishedDate: Date
        }]
    }],
    chats:[{
        message: String,
        senderId: String,
        recieverId: String,
        createdDate: Date
    }],
    post:[{
        createdBy: String,
        message: String,
        createdDate: Date,
        status: String
    }]
}, {
    versionKey : false, //Turn off versioning,
})


module.exports = mongoose.model("data", data)