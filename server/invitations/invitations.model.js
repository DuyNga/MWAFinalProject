const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    token : {type: String, unique:true, required:true},
    questionIds:{type: Array , required: true},
    email:{type: String , required: true},
    status: {type:String, default:"active"},
    sendby:{type: String , required: true},
    answers:{type: Array , required: true},
    result:{type: String},
    inviteeName:{type: String , required: true}
});

schema.set('toJSON', {virtuals:true});
module.exports= mongoose.model('Invitation',schema);