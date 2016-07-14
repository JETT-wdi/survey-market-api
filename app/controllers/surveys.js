'use strict';
const controller = require('lib/wiring/controller');
const models = require('app/models');
const Survey = models.survey;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Survey.find()
    .then(surveys => res.json({ surveys }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Survey.findById(req.params.id)
    //if there is an example (? tests), render it in json. else next.
    .then(survey => survey ? res.json({ survey }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let survey = Object.assign(req.body.survey, {
    _owner: req.currentUser._id
  });
  Survey.create(survey)
  .then(survey => res.json({ survey }))
  .catch(err => next(err));
};

const update = (req, res, next) => {
  console.log(req.body);
  console.log(req.body.params);
  console.log(req.body.survey);
  //need to properly assign
  let surveyId = req.body;
  let questionId = req.body;
  let answerId = req.body;
  let userId = req.currentUser._id;
      Survey.findById(surveyId)
      .then((survey) => {
      let question = survey.questions.id(questionId);
      let answer = question.answers.id(answerId);
      answer.votes.push(userId);
      console.log('answer is ', answer);
      return survey.save();
    })
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Survey.findOne(search)
    .then(survey => {
      //if it doesn't match example, just move on.
      if (!survey) {
        return next();
      }

      return survey.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};


module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });
