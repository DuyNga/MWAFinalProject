const express = require('express');
const router = express.Router();
const questionService = require('./questions.service');
var ObjectId = require('mongodb').ObjectID;

// routes
router.post('/add', register);
router.get('/get_all', getAll);
router.get('/get_random', getRandom);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.put('/updatestatus/:id', updateStatus);


module.exports = router;

function register(req, res, next) {
    questionService.create(req.body)
        .then(() => res.json({ status: "Save question successfully." }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    questionService.getAll()
        .then(questions => res.json(questions))
        .catch(err => next(err));
}

function getRandom(req, res, next) {
    questionService.getRandom()
        .then(questions => res.json(questions))
        .catch(err => next(err));
}

function getById(req, res, next) {
    questionService.getById(ObjectId(req.params.id))
        .then(question => question ? res.json(question) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    questionService.update(ObjectId(req.params.id), req.body)
        .then(() => res.json({ status: "Save question successfully." }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    questionService.delete(req.params.id)
        .then(() => res.json({ status: "Delete question successfully." }))
        .catch(err => next(err));
}

function updateStatus(req,res, next){
    console.log(req.params);
    questionService.updateStatus(req.params.id).then(()=>res.json({}))
    .catch(err=>next(err));
}