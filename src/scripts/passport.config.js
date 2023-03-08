const passport = require('passport')
const local = require('passport-local')
const userModel = require('../models/user.model')
const { hashPassword } = require('../utils/bcrypt')

const initPassport = () => {
    passport.use('register', new local.Strategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    }, async (req, username, password, done) => {
        const { firts_name, last_name, age } = req.body;

        try {

            const userExist = await userModel.findOne({ email: username });
            if (userExist) {
                done(null, false);
            } else {
                const hash = await hashPassword(password);
                const newUser = await userModel.create({
                    firts_name,
                    last_name,
                    age,
                    email: username,
                    password: hash,
                })
                done(null, newUser);
            }

        } catch (error) {
                done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user)});

}  

module.exports= initPassport; 