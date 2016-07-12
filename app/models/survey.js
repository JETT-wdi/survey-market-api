'use strict';

const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
      title: {
        type: String,
      },
      questions: [
        [{ query: { type: String}},
         {option: { type: String }, numberOfVotes: { type: Number }}
        ]
      ],
      _owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        }
      },
      {
        timestamps: true,
      });

    const Survey = mongoose.model('Survey', surveySchema);

    module.exports = Survey;
