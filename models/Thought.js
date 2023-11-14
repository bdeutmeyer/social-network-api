const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');



const thoughtSchema = new Schema({
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
    reactions: [Reaction],
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
// thoughtSchema.methods.getDateFormat = function (date) {
//     return date.toLocaleDateString();
// };

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

// const reactionData = [];

// Thought.find({})
//     .exec()
//     .then(collection => {
//         if (collection.length === 0) {
//             Thought
//             .create({ thoughtText: 'Test thought', username: 'testuser', reactions: reactionData })
//             .then(data => console.log(data))
//             .catch(err => console.error(err));
//         }
//     })


// getDateFormat();

module.exports = Thought;