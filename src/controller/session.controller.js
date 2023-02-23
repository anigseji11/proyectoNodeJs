const UserModel = require('../models/user.model')

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
        const user = await UserModel.findOne({ email, password })
        if (user) {
            req.session.user = {...user, role:'User'};
            res.send(user);
        } else {
            res.status(401).send('Email o contraseña incorrectos');
        }
    }
   
}

const registerUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send('Error al crear usuario .' + error); 
    }
}

module.exports = {
    getUser,
    registerUser
};