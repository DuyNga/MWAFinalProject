const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    invitation : {type: String, unique:true, required:true},
    sampleAnswer:{type: String , required: true},
    status: {type:String, default:"active"}
});

schema.set('toJSON', {virtuals:true});
module.exports= mongoose.model('Question',schema);