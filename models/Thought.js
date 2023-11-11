const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: ObjectId,
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
        createdAt: { type: Date, default: Date.now },
        //getter method to format the timestamp on query

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: { type: Date, default: Date.now },
    //getter method to format the timestamp on query
    username: {
        type: String,
        required: true,
    },
    reactions: [],

})
    //virtual called 'reactionCount' that retrieves the length of the thought's 'reactions' array field on query
//example virtual: postSchema.virtual('commentCount').get(function () {
//   return this.comments.length;
// });
//subdocuments, model, instance, export, 