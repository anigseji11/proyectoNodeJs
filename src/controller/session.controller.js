const UserModel = require('../models/user.model')
const {hashPassword, comparePassword} = require('../utils/bcrypt')

const getUser = async (req, res) => {
    const { email, password } = req.body;
    if(email == 'adminCoder@coder.com' && password == 'adminCod3r123'){
        const userAdmin= {
            firtsName: 'Admin',
            lastName: 'Coder',
            age:'2',
            email,
            password,
            role:'Admin'
        }
        req.session.user = userAdmin;
    }else{
        const user = await UserModel.findOne({ email })
        const isValidPassword = await comparePassword(password, user.password)
        if (user && isValidPassword) {
            req.session.user = {...user, role:'User'};
            res.send(user);
        } else {
            res.status(401).send('Email o contraseña incorrectos');
        }
    }
   
}

const registerUser = async (req, res) => {
   res.send(req.user);
}

module.exports = {
    getUser,
    registerUser
};