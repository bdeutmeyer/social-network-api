const { Thought, User } = require('../models');

// **`/api/thoughts`**
module.exports = {
    // * `GET` to get all thoughts
    async getAllThoughts(req, res) {
        try {
            const allThoughts = await Thought.find();
            res.status(200).json(allThoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `GET` to get a single thought by its `_id`
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({ _id: req.params.thoughtId});

            if (!singleThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.status(200).json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    // ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```
    async createThought(req, res) {
        try {
            const thoughtToCreate = await Thought.create(req.body);
            const userWhoThought = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughtToCreate._id } },
                { new: true }
            );

            if (!userWhoThought) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID'
                })
            }

            res.status(200).json('Thought created!');
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    // * `PUT` to update a thought by its `_id`
    async updateThought(req, res) {
        try {
            const thoughtToUpdate = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText }, {new: true});
            if (!thoughtToUpdate) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json(thoughtToUpdate);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `DELETE` to remove a thought by its `_id`
    async deleteThought(req, res) {
        try {
            const thoughtToDelete = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thoughtToDelete) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field
    async createReaction(req, res) {
        try {
            const reactionToCreate = await Thought.create(req.body);
            res.status(200).json(reactionToCreate);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    async deleteReaction(req, res) {
        try {
            const reactionToDelete = await Reaction.findByIdAndDelete(req.params.reactionId);
            if (!reactionToDelete) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }
            res.status(200).json({ message: 'Reaction deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
