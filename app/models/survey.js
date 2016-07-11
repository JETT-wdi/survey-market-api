'use strict';

const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [{
    query: {
      type: String,
      required: true,
    },
    answers: [{
      option: {
        type: String,
        required: true,
      },
      numberOfVotes: {
        type: Number,
        required: true,
        default: 0,
      },
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

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
