const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI|| config.connectionString);

mongoose.Promise = global.Promise;
module.exports = {
    User:require('../users/users.model'),
    Invitation:require('../invitations/invitations.model'),
    Question:require('../questions/questions.model'),
    BlackList:require('../invitations/blacklist.model')
}