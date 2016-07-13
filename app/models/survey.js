'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// const Question = require('./question.js');

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {
  timestamps: true,
  toJSON: { virtuals: true},
});

answerSchema.virtual('numVotes').get(function () {
  return this.votes.length;
});

const questionSchema = new mongoose.Schema({
    query: {
      type: String,
      required: true,
    },
    answers: [answerSchema]
}, {
  timestamps: true,
  toJSON: { virtuals: true},
});


const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  questions: [questionSchema],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true},
});

surveySchema.plugin(uniqueValidator);

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
