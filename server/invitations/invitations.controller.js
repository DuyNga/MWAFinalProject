const express = require('express');
const router = express.Router();
const invitationService = require('./invitations.service');
var ObjectId = require('mongodb').ObjectID;

// routes
router.post('/add', register);
router.get('/get_all', getAll);
router.post('/send_email', sendEmail);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.put('/updatestatus/:id', updateStatus);


module.exports = router;

async function register(req, res, next) {
    await invitationService.create(req.body)
        .then((data) => {
            try {
                res.json({ status: JSON.stringify(data),
            savedInvitation: data });
                console.log("data  "+data);
            } catch (error) {
                
            }
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    invitationService.getAll()
        .then(invitations => res.json(invitations))
        .catch(err => next(err));
}

function sendEmail(req, res, next) {
    let body = req.body;
    body.link = ` Zữ zằn ◕ ‿ ◕
    https://www.youtube.com/watch?v=FoCG-WNsZio`;
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

function updateStatus(req,res, next){
    console.log(req.params);
    invitationService.updateStatus(req.params.id).then(()=>res.json({}))
    .catch(err=>next(err));
}