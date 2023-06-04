const User = require("../models/userModel");

exports.registration = async (req, res) => {
    try {
        res.render("registration.hbs");
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}

exports.login = async (req, res) => {
    try {
        res.render("login.hbs")
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}


exports.profile = async (req, res) => {
    try {
        const { email } = req.params;

        if (email === "null") {
            res.redirect("../registration")
        } else {
            const user = new User(null, null, email);
            const response = await user.select();

            res.render("profile.hbs", {
                user: response
            })
        }
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}

exports.enterUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = new User(null, null, email, password);
        const response = await user.select()

        if (response.length > 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}

exports.createUser = async (req, res) => {
    try {
        const { login, email, password } = req.body;

        const user = new User(null, login, email, password);
        const response = await user.create();

        res.sendStatus(response);
    } catch (error) {
        console.log(error);

        res.sendStatus(500);
    }
}