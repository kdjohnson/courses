# courses-ada

## Starting Backend Server and Database

1. You will need to install [Docker](https://docs.docker.com/get-docker/)

2. Set the following environment variables:

   ```bash
   export COURSES_DB_USERNAME=<YOUR_VALUE>
   export COURSES_DB_PASSWORD=<YOUR_VALUE>
   export COURSES_DB_NAME=<YOUR_VALUE>
   ```

3. Once installed, run `docker compose up -d` to start the postgres database and the go http server

## Running React code

1. Make sure you have NodeJS and NPM installed
2. Run an `npm i && npm start` in the root of the project. This will start the frontend on `localhost:3000`
