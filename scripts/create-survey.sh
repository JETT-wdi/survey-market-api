curl --include --request POST http://localhost:3000/surveys \
--header "Authorization: Token token=ADD TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "survey": {
    "title": "Another example test thing YAY SO LONG TITLE",
    "questions": [{
        "query": "What is this?",
        "answers": [{
          "option": "death",
          "numberOfVotes": 2
        }, {
          "option": "hate",
          "numberOfVotes": 2
        }]
      },
     {
      "query": "Do you hate this?",
      "answers": [{
        "option": "yes",
        "numberOfVotes": 3
      }, {
        "option": "of course",
        "numberOfVotes": 5
      }]
    }]
  }
}'
