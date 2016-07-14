
curl --include --request POST http://localhost:3000/surveys \
--header "Authorization: Token token=ADD TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "survey": {
    "title": "Another example test thing YAY SO LONG TITLE",
    "questions": [{
        "query": "What is this?",
        "answers": [{
          "option": "death"
        }, {
          "option": "hate"
        }]
      },
     {
      "query": "Do you hate this?",
      "answers": [{
        "option": "yes"
      }, {
        "option": "of course"
      }]
    }]
  }
}'
