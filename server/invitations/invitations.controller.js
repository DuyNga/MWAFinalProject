const express = require('express');
const router = express.Router();
const invitationService = require('./invitations.service');
var ObjectId = require('mongodb').ObjectID;
const config = require('../config.json');
// routes
router.post('/add', register);
router.get('/get_all', getAll);
router.post('/send_email', sendEmail);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/answer/', updateAnswer);
router.post('/blacklist', updateBlacklist);
router.get('/blacklist/:token', getBlackList);
module.exports = router;

function register(req, res, next) {
    invitationService.create(req.body)
        .then(() => res.json({ status: "Save invitation successfully." }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    invitationService.getAll()
        .then(invitations => res.json(invitations))
        .catch(err => next(err));
}

function sendEmail(req, res, next) {
    let body = req.body;
    console.log("send email");
    console.log(body.email);
   
    const token = invitationService.examToken(body);
    body.link = `http://localhost:4200/exam/`+token;
    invitationService.sendEmail(body)
        .then(invitations => res.json({status:"Send mail successfully."}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    invitationService.getById(ObjectId(req.params.id))
        .then(invitation => invitation ? res.json(invitation) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    invitationService.update(ObjectId(req.params.id), req.body)
        .then(() => res.json({ status: "Save invitation successfully." }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    invitationService.delete(req.params.id)
        .then(() => res.json({ status: "Delete invitation successfully." }))
        .catch(err => next(err));
}

function updateAnswer(req, res, next){
    console.log("update answer");
    console.log(req.body);
    invitationService.updateAnswer(req.body)
        .then(() => res.json({ status: "Save invitation successfully." }))
        .catch(err => next(err));
}

function updateBlacklist(req,res,next){
    invitationService.addTokenToBlackList(req.body).then(()=>res.json({message : "Token was used"}))
    .catch(err=> next(err) );
}

function getBlackList(req, res, next){
    console.log(req.params.token);
    invitationService.getBlackListToken(req.params.token).then(result => res.json(result))
    .catch(err=> next(err) );
}