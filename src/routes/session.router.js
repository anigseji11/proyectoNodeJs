const { Router } = require('express');
const router = Router();
const sessionController = require('../controller/session.controller')
const passport = require('passport');

router.get('/', async (req, res) => {
    res.render('login', {
        
    })
})


router.post('/login', sessionController.getUser)
router.post('/registro', passport.authenticate("register") ,sessionController.registerUser)
    


router.get('/perfil', async (req, res) => {
    if (req.session.user){ 
        res.render('perfil', { name: req.session.user.first_name })
    }else{
        res.render('login', { })
    } 
})

router.get('/register', async (req, res) => {
    res.render('register', {
        
    })
})

module.exports = router; 