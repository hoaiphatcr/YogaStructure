const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

let User = require('../models/users');

router.post('/new', function (req, res) {
    req.assert('email', 'Email must be set').notEmpty();
    req.assert('password', 'Password must be set').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    } else {
        let user = new User();
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ msg: 'User register', user });
            }
        })
    }
});

router.post('/login', [
    check('email', 'Email must be set').notEmpty(),
    check('email', 'Incorrect email format').isEmail(),
    check('password', 'Password must be set').notEmpty()
], function (req, res) {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json('Error: '+errors);
    } else {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return err;
            } else {
                return res.status(200).json(user);
            }
        });
    }
});

router.post('/register', [
    check('email', 'Email must be set').notEmpty(),
    check('email', 'Email must be set').isEmail(),
    check('password', 'Password must be set').notEmpty()
], function (req, res) {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('errorPage', { errors: errors.array() });
    } else {
        let user = new User();
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json({ msg: 'User register', user });
            }
        })
    }
});

router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            // Send all users.
            res.json({ users: users });
        }
    });
});

router.post('/edit/:id', function (req, res) {
    let user = {};
    user.author = req.body.author;
    user.content = req.body.content;

    let query = { _id: req.params.id }

    User.update(query, user, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.status(200).json({ msg: 'User successfully updated', user: user });
        }
    });
});

router.delete('/:id', function (req, res) {
    let query = { _id: req.params.id }

    User.remove(query, function (err) {
        if (err) {
            console.log(err);
        }
        res.status(200).json({ msg: 'User deleted successfully!' });
    });
});

module.exports = router;