const express = require('express');
const router = express.Router();
const userService = require('./users.service');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.put('/updatestatus/:id', updateStatus);
router.get('/verifyToken/:token', verifyToken);




module.exports = router;

function authenticate(req, res, next) {
    console.log(req.body);
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.status(200).json({message: 'OK'}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
  
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    console.log(req.params.id);
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.status(200).json({message: 'OK'}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateStatus(req,res, next){
    console.log(req.params);
    userService.updateStatus(req.params.id).then(()=>res.json({}))
    .catch(err=>next(err));
}

function verifyToken(req, res, next) {
    console.log("verify token");
    // check header or url parameters or post parameters for token
    var token = req.params.token;// req.headers["x-access-token"];
   
    console.log(req.params.token);
    if (!token)
      return res.status(403).send({ auth: false, message: "No token provided." });
  
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
  
      // if everything is good, save to request for use in other routes
      res.user= decoded.user;
      
    });
  }