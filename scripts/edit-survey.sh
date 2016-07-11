curl --include --request PATCH http://localhost:3000/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "survey": {
      "title": "something else guys",
    }
  }'


  curl --include --request PATCH http://localhost:3000/surveys/5783e027e52da61d56deb05e \
    --header "Authorization: Token token= \
    --header "Content-Type: application/json" \
    --data '{
      "survey": {
        "title": "something else guys"
      }
    }'

# it works
