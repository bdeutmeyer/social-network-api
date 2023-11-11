const { User } = require('../models');

// **`/api/users`**
module.exports = {
    // * `GET` all users
    async getAllUsers(req, res) {
        try {
            const allUsers = await User.find();
            res.json(allUsers)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `GET` a single user by its `_id` and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId});

            if (!singleUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
// thought and friend data here
            res.status(200).json(singleUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `POST` a new user:

// ```json
// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// ```
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
            const userToUpdate = await User.findByIdAndUpdate({ _id: req.params.userId }, { username: req.body.username, email: req.body.email }, {new: true});
            if (!userToUpdate) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.status(200).json(userToUpdate);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // * `DELETE` to remove user by its `_id`

// **BONUS**: Remove a user's associated thoughts when deleted.
    async deleteUser(req, res) {
        try {
            const userToDelete = await User.findByIdAndDelete(req.params.userId);
            if (!userToDelete) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.status(200).json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};












// ---

// **`/api/users/:userId/friends/:friendId`**

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list

// ---