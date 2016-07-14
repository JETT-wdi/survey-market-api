'use strict';
const mongoose = require('../app/middleware/mongoose');
const db = mongoose.connection;
const Survey = require('../app/models/survey.js');
const done = function() {
  db.close();
};

const User = require('../app/models/user');

const update = (surveyId, questionId, answerId, userId) => {
    Survey.findById(surveyId)
    .then((survey) => {
      let question = survey.questions.id(questionId);
      let answer = question.answers.id(answerId);
      answer.votes.push(userId);
      console.log('answer is ', answer);
      return survey.save();
  })
  .catch(console.error)
  .then(done)
  ;
};

db.once('open', function() {
  let command = process.argv[2];

  // Using more than once, avoiding jshint complaints
  let field;
  let id;

  switch (command) {
    case 'create':
      let givenName = process.argv[3];
      let surname = process.argv[4];
      let dob =  process.argv[5];
      let gender =  process.argv[6];
      let height = process.argv[7];
      let weight = process.argv[8];
      if (true || givenName) {
        create(givenName, surname, dob, gender, height, weight);
      } else {
        console.log('usage c <given_name> <surname> <date of birth> [gender], <height>, <weight>');
        done();
      }
      break;

    case `show`:
      id = process.argv[3];
      show(id);
      break;

    case 'update':
      let surveyId = process.argv[3];
      let questionId = process.argv[4];
      let answerId = process.argv[5];
      let userId = process.argv[6];
      update(surveyId, questionId, answerId, userId);
      break;

    case 'destroy':
      id = process.argv[3];
      destroy(id);
      break;

    default:
      index();
      break;
  }

});
