const { User, Thought } = require('../models');

// **`/api/users`**
module.exports = {
    // * `GET` all users
    async getAllUsers(req, res) {
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // * `GET` a single user by its `_id` and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId})
            .populate('thoughts')
            .populate('friends');

            if (!singleUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            };

            res.status(200).json(singleUser);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // * `POST` a new user:
    async createUser(req, res) {
        try {
            const userToCreate = await User.create(req.body);

            res.status(200).json(userToCreate);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `PUT` to update a user by its `_id`
    async updateUser(req, res) {
        try {
            const userToUpdate = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {new: true});

            if (!userToUpdate) {
                return res.status(404).json({ message: 'No user with that ID' });
            };

            res.status(200).json(userToUpdate);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    // * `DELETE` to remove user by its `_id`
    async deleteUser(req, res) {
        try {
            const userToDelete = await User.findOne({ _id: req.params.userId });
            const username = userToDelete.username;
            const userDelete = await User.findByIdAndDelete({ _id: req.params.userId });
            const deleteThoughts = await Thought.deleteMany({ username: username });
            console.log(deleteThoughts)

            if (!userDelete) {
                return res.status(404).json({ message: 'No user with that ID' });
            };
            res.status(200).json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
// **`/api/users/:userId/friends/:friendId`**
    // * `POST` to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const addingFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { new: true }
            );

            const friendBeingAdded = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.userId }},
                { new: true }
            );

            if (!addingFriend || !friendBeingAdded) {
                return res.status(404).json({
                    message: 'Could not add friend. Please double-check userId and friendId.'
                })
            };
            res.status(200).json('Friend added!');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `DELETE` to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const removingFriend = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: { friends: req.params.friendId}},
                { new: true }
            );

            const friendBeingRemoved = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId }},
                { new: true }
            );

            if (!removingFriend || !friendBeingRemoved) {
                return res.status(404).json({
                    message: 'Could not remove friend. Please double-check userId and friendId.'
                })
            };

            res.status(200).json('Friend removed!');
        } catch (err) {
            res.status(500).json(err);
        }
    }
};