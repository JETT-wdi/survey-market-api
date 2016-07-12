
curl --include --request POST http://localhost:3000/surveys \
--header "Authorization: Token token=ZVEWUfDZQFC9tBQvsMA2LKE/IbsqK96aRZvNvV9o6A0=--XZiD2VaUKRfYwWooNNz343lJPsQy95RtfwiApr2BEBI=" \
--header "Content-Type: application/json" \
--data '{
  "survey": {
    "title": "example for new schema",
    "questions": [
    [{"query": "meow?"}, {"option": "please", "numberOfVotes": 2}, {"option": "work", "numberOfVotes": 3}],
    [{"query": "testing?"}, {"option": "load", "numberOfVotes": 1}, {"option": "cmaaan", "numberOfVotes": 3}]
    ]
  }
}'






,
[
{"query": "What is this 2?"},
{{"option": "death2"}, {"numberOfVotes": 2}},
{{"option": "hey2"}, {"numberOfVotes": 3}}]
