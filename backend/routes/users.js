const router = require('express').Router();
let User = require('../models/user.model.js');

//este es el primer endpoint que maneja la entrada get del http
router.route('/').get((req, res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const username = req.body.username; //req.body.username va a ser asignado
    //a la variable username
    const newUser = new User({username});

    newUser.save()
    .then(()=> res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;