const Rollbar = require("rollbar")

var rollbar = new Rollbar({
    accessToken: 'a998601f1c814ca7be85b37e7ff873cc',
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
  
  // record a generic message and send it to Rollbar
  rollbar.log('Hello world!')

const movieDatabase = []
let todoDatabase= []

let movieId = 1
let todoId = 1
module.exports = {
    addTodo: (req, res) => {
        const {todoName} = req.query
        const newObj = {
            todoId: todoId,
            todoName: todoName,
        };
        todoDatabase.push(newObj)
        todoId++
        res.status(200).send(todoDatabase);
        rollbar.info('New item added to list.')
    },
    getTodo: (req,res) => {
        res.status(200).send(todoDatabase);
    },
    editTodo: (req,res) => {
        const {id} = req.params;
        const {newTodo} = req.query;
        const todoIndex = todoDatabase.findIndex((todo) => todo.todoId === +id);
        if (todoIndex === -1){
            res.status(400).send("Todo doesnt exist");
            rollbar.warning('Non-valid index entered.')
            return;
        }
        todoDatabase[todoIndex].todoName = newTodo;
        res.status(200).send(todoDatabase)
    },
    deleteTodo: (req,res) => {
        todoDatabase = [];
        res.status(200).send(todoDatabase)
        rollbar.critical('Todo list cleared')
    },

    addMovie: (req, res) => {
        const {movieName, charName} = req.query
        const newObj = {
            movieId: movieId,
            movieName: movieName,
            charName: charName,
        };
        movieDatabase.push(newObj)
        movieId++;
        res.status(200).send(movieDatabase);
    },
    getMovie: (req, res) => {
        res.status(200).send(movieDatabase);
    },
    editMovie: (req, res) => {
        const {id} = req.params;
        const {newMovieName, newCharName} = req.query;
        const movieIndex = movieDatabase.findIndex((movie) => movie.movieId === +id);
        if (movieIndex === -1){
            res.status(400).send("Movie not found");
            return;
        }
        movieDatabase[movieIndex].movieName = newMovieName;
        movieDatabase[movieIndex].charName = newCharName;
        res.status(200).send(movieDatabase)
    },
    deleteMovie: (req, res) => {
        const {id} = req.params;
        const movieIndex = movieDatabase.findIndex((movie) => movie.movieId === +id);
        if (movieIndex === -1){
            res.status(400).send("Movie not found");
            return;
        }
        movieDatabase.splice(movieIndex,1);
        res.status(200).send(movieDatabase)
    },

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["Wealth is coming your way.", "You will buy Austin a coffee.", "Don't be discouraged, because every wrong attempt discarded is another step forward.",
        "How many of you believe in psycho-kinesis? Raise my hand.", "Fortune Not Found: Abort, Retry, Ignore?" ]

        let fortuneIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[fortuneIndex];

        res.status(200).send(randomFortune)
    },

    getMagicEight: (req, res) => {
        const magicAnswers = [ "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.","You may rely on it.", " As I see it, yes.",
             "Most likely.",  "Outlook good.","Yes.", "Signs point to yes.","Reply hazy, try again.","Ask again later.", "Better not tell you now.","Cannot predict now.",
             "Concentrate and ask again."," Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."]
        let magicIndex = Math.floor(Math.random() * magicAnswers.length);
        let randomMagic = magicAnswers[magicIndex];

        res.status(200).send(randomMagic)            
    },
 }