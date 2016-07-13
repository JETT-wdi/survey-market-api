'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  questions: [{
    query: {
      type: String,
      required: true,
    },
    answers: [{
      text: {
        type: String,
      },
      votes: [{
      }],
    }]
  }],

  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

surveySchema.virtual('questions.answers.numVotes').get(function () {
  return this.questions.answers.votes.length;
});

surveySchema.plugin(uniqueValidator);

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
