const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: ObjectId, 
            default: () => new ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: { 
            type: Date, 
            default: Date.now },
    },
);

//getter method to format the timestamp on query
reactionSchema.methods.getDateFormat = function (date) {
    return date.toLocaleDateString();
};

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
//getter method to format the timestamp on query
thoughtSchema.methods.getDateFormat = function (date) {
    return date.toLocaleDateString();
};

reactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

const reactionData = [];

Thought
    .create({ thoughtText: 'Test thought', username: 'testuser', reactions: reactionData })
    .then(data => console.log(data))
    .catch(err => console.error(err));

module.exports = Thought;