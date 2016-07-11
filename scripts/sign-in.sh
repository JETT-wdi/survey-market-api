#!/bin/bash

curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "another@example.email",
      "password": "an example password"
    }
  }'


token: jHkB1HHwXjDZCP8/zaCeklxHPQjViipBTt2iRzM/cgw=--+Tmb7D9zeQKel5vjAWEq7tJyrw7fhBUTZVMksG6v8Ok=
