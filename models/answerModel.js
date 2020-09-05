///connect through mongoose 
const mongoose = require('mongoose');
//answer schema - User can post answers to questions to the server 
//& view answers to questions when on the correct route.

//declare a new mongoose instance
const answerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //generates unique answer id
    answer: {
        type: String,
        required: true,
        default: "Answer not recorded"
    }, //id of specific question being answered.
    toQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Questions' },
    userAnswering: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}); //id of user who is answering the question

//model answers (stored in mongo database)
const Ans = mongoose.model('Questions', questionSchema);

//export module to be used in other files in the project
module.exports = Ans;

//Schema - copy below to postman
//{"answer":"","toQuestion":"","userAnswering":""}
// answer IS string. question IS id. user answering IS id.