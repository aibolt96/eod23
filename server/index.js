const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(`public`))

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'a998601f1c814ca7be85b37e7ff873cc',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const { getCompliment, getFortune, getMagicEight, getMovie, addMovie, editMovie, deleteMovie,
getTodo, addTodo, editTodo, deleteTodo} = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/magicAnswer", getMagicEight);
app.get("/api/movie", getMovie);
app.post("/api/movie", addMovie);
app.put("/api/movie/:id", editMovie);
app.delete("/api/movie/:id", deleteMovie)
app.get("/api/todo", getTodo);
app.post("/api/todo", addTodo);
app.put("/api/todo/:id", editTodo);
app.delete("/api/todo", deleteTodo)


app.listen(4000, () => console.log("Server running on 4000"));
