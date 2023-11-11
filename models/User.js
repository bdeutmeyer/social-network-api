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
);

userSchema.virtual('friendCount').get(function (friends) {
    return friendData.length; //i am confident this is not right--it's just a placeholder
    //still needs a virtual 'friendCount' that retrieves the length of the user's 'friends' array field on query
});

const User = mongoose.model('user', userSchema);

const thoughtData = [];
const friendData = [];

User
    .create({ username: '', email: '', thoughts: thoughtData, friends: friendData })
    .then(data => console.log(data))
    .catch(err => console.error(err));

//need subdocuments??

module.exports = User;