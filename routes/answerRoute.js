const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Answers = require('../models/answerModel');
//importing Quesiton schema to retrieve all answers according to a QuestionID
const { route } = require('./users');
const { json } = require('body-parser');
const Ans = require('../models/answerModel');
//authentication
const { userAuth, checkRole } = require('../utils/config');
const { count } = require('../models/answerModel');


//lists all the answers /answerRoute
router.get('/', userAuth, async(req, res, next) => {
    try {
        Answers.find().exec().then(answer => { res.json(answer) })
    } catch (error) {
        res.status(500).json({ error: err })
    }
});

// {"answer":"","questions":"","user":""}
router.post('/addAnswer', userAuth, checkRole("user"), (req, res, next) => {
    const answer = new Answers({
        _id: mongoose.Types.ObjectId(),
        answer: req.body.answer,
        questions: req.body.questions,
        user: req.body.user
    })

    answer
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(
                result
            );

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})

//selects specific answer - BY ANSWER ID!
router.get('/:answerId', userAuth, (req, res, next) => {
    Answers.findById(req.params.answerId)
        .exec()
        .then(answer => {


            res.status(200).json({
                answer: answer,
                request: {
                    type: "GET",
                    url: "http://localhost:4000/listanswers"
                }
            })

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

//deletes answer by answer id (needs to be done after user has logged in)
router.delete("/delete/:answerId", userAuth, checkRole("admin"), (req, res, next) => {
    Answers.remove({ _id: req.params.answerId })
        .exec()
        .then(
            res.status(200).json({
                message: "Answer deleted sucessfully",
                request: {
                    type: "DELETE",
                    url: "http://localhost:4000/listanswers",
                    body: { userId: "ID", question: "String" }
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })

        )
});

//Last User story:

//3. User can mark one answer as preferred out of all the responses their question got. 
//3. POST - Single Access with user priority
//Schema - {"answerID":"","preferred":false}
router.post('/:preferredAnswer/true', userAuth, checkRole("user"), (req, res) => {

        Answers.findOneAndUpdate({ _id: req.params.preferredAnswer }, { preferred: 1 })
            .exec().then(data => res.status(200).json({
                message: data,
                request: {
                    type: "POST",
                    url: "http://localhost:4000/listanswers",
                }
            })).catch(err => {
                res.status(500).json({ error: err })
            });

    })
    //{"answerID":"","preferred":false}
    //User can mark THEIR question as non preferred

router.post('/:preferredAnswer/false', userAuth, checkRole("user"), (req, res) => {

    Answers.findOneAndUpdate({ _id: req.params.preferredAnswer }, { preferred: 0 })
        .exec().then(data => res.status(200).json({
            message: data,
            request: {
                type: "POST",
                url: "http://localhost:4000/listanswers",
            }
        })).catch(err => {
            res.status(500).json({ error: err })
        });

})

//ANY User can Upvote an answer
//using the answer id. Calculated from the token.
router.get('/upvote', (req, res, next) => {
    var count = 0;

    Answers.findOne({ _id: req.param })
        .then(data => count = data)
        .catch(err => {
            res.status(500).json({ error: err })
        })


    next();
});

//GET the total votes from database
//next();
//then POST to update

router.post('/upvote', (count) => {

    Answers.update({ _id: answerId }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Result :", result)
        }
    });

});

module.exports = router; //exporting answer routes to index.js file