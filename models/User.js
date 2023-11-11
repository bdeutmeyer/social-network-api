const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.'],
        },
        thoughts: [],
        friends: [],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)
//still needs a virtual 'friendCount' that retrieves the length of the user's 'friends' array field on query

//need subdocuments?? need to create model User, need instance of model

module.exports = User;