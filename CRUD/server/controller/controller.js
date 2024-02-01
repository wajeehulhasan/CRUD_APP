import Userdb from '../model/model.js';

const create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "content cannot be empty" })
        return;
    }
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    // save user in database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add_user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occur while creating a create operation"
            })
        })
};

// Retrieve and return all users / Retrieve and return a single user
const find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "not found user with id : " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error in retriving user with id : " + id })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "error occured while retriving user info" })
            })
    }
};

// Update a user by user id
const update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "data to be update can not be empty" })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot update user with id: ${id}. may be user not found` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "error in updating user info" })
        })
};

// Delete user by user id
const remove = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot delete with id ${id}. may be id is wrong` })
            } else {
                res.send({
                    message: "user deleted successfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "could not delete user with id = " + id
            })
        })
};

export { create, find, update, remove };
