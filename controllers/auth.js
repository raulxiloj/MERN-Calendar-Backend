const { response } = require('express'); //Just to have the intellisense
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user is registered with that email'
            })
        }

        user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }

}

const login = (req, res = response) => {

    const { email, password } = req.body;

    res.status(200).json({
        ok: true,
        msg: 'login'
    })
}

const renewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    })

}

module.exports = {
    createUser,
    login,
    renewToken
}