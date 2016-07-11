curl --include --request PATCH http://localhost:3000/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "survey": {
      "title": "something else guys",
    }
  }'


  curl --include --request PATCH http://localhost:3000/surveys/5783e027e52da61d56deb05e \
    --header "Authorization: Token token=jHkB1HHwXjDZCP8/zaCeklxHPQjViipBTt2iRzM/cgw=--+Tmb7D9zeQKel5vjAWEq7tJyrw7fhBUTZVMksG6v8Ok=" \
    --header "Content-Type: application/json" \
    --data '{
      "survey": {
        "title": "something else guys"
      }
    }'

# it works
