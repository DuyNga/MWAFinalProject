const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    token : {type: String, required:true},
    questionIds:{type: Array , required: true},
    email:{type: String , required: true},
    status: {type:String, default:"Active"},
    sendby:{type: String },
    answers:{type: Array},
    result:{type: String},
    inviteeName:{type: String , required: true},
    submittedAnswer:{type:Array},
});



schema.set('toJSON', {virtuals:true});
module.exports= mongoose.model('Invitation',schema);