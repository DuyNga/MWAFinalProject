const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Question = db.Question;

module.exports = {
    getRandom,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    updateStatus
};

async function getRandom(){
    return await Question.aggregate().sample(3);
}

async function getAll() {
    return await Question.find({}, null, {sort: 'question'});
}

async function getById(id) {
    return await Question.findById(id);
}

async function create(questionParam) {
    // validate
    if (await Question.findOne({ question: questionParam.question })) {
        throw 'This question is already registed';
    }

    const question = new Question(questionParam);

    // save question
    await question.save();
}

async function update(id, questionParam) {
    const question = await Question.findById(id);

    // validate
    if (!question) throw 'Question not found';
    if (question.question !== questionParam.question && await Question.findOne({ question: questionParam.question })) {
        throw 'This question is already registed';
    }

    // copy questionParam properties to question
    Object.assign(question, questionParam);

    await question.save();
}

async function _delete(id) {
    await Question.findByIdAndRemove(id);
}

async function updateStatus(id, questionParam) {
    const question = await Question.findById(id);
    console.log(question);
    // validate
    if (!question) throw 'Question not found';
 
    if(question.status==='Active'){
       question.status ='Deactive';
    }else{
        question.status ='Active';
    }

    await question.save();
}