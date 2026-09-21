# Login and Signup

Andrew Polyakov
ICSI 418Y - Programming Assignment 2

## Description

A full-stack login and signup app. The frontend is React (made with Vite) and
has two forms you can switch between with the tabs at the top. The backend is an
Express server with two routes, `POST /signup` and `POST /login`, that talk to a
MongoDB Atlas database. Users are stored in the `users` collection of the `pa2`
database with the fields `f_name`, `l_name`, `username`, and `password`.

Every result (account created, username taken, wrong password, missing fields,
server not running, etc.) shows up as a message under the form so you never have
to open the console.

## Running it

You need two terminals.

Backend:

```
cd server
npm install
node server.js
```

Frontend:

```
cd client
npm install
npm run dev
```

Then open http://localhost:5173. The backend runs on port 9000.

## .env

The server reads the MongoDB connection string from `server/.env`, which is not
committed. Copy `server/.env.example` to `server/.env` and fill in your Atlas
connection string:

```
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster...
```

## Files

```
client/src/App.jsx               tabs that switch between Login and Signup
client/src/components/Login.jsx  login form
client/src/components/Signup.jsx signup form
client/src/index.css             styling
server/server.js                 express routes + mongodb
```
