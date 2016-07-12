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
  let survey = Object.assign(
    {req.body.survey.title,
    req.body.survey.questions,
    req.body.survey.questions.query,
    req.body.survey.questions.option,
    req.body.survey.questions.numberOfVotes}
    {
    _owner: req.currentUser._id
  });
  Survey.create(survey)
  .then(survey => res.json({ survey }))
  .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  //comes from request params.
  Survey.findOne(search)
    .then(survey => {
      //if there is no matching example, move on.
      if (!survey) {
        return next();
      }
      //delete the parameter of owner sent from the request
      delete req.body._owner;  // disallow owner reassignment.
      //return the request body example (because res will be blank)
      return survey.update(req.body.survey)
        .then(() => res.sendStatus(200)); //but send res status as 200
    })
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
