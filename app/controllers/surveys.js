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
  Survey.findById(req.params.survey._id)
  .then((survey) => {
    survey.questions.findById(req.params.survey.questions._id);
  })
  .then((question) => {
    question.answers.findByIdAndUpdate(
      req.params.survey.questions.answers._id,
      { $push: {"votes": req.currentUser._id }},
      {  safe: true, upsert: true},
      function(err, model) {
        if(err){
         console.log(err);
         return res.send(err);
        }
         return res.json(model);
     });
  })
    .then(() => res.sendStatus(200)) //but send res status as 200
    .catch(err => next(err));
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
