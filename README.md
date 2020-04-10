## install depencenies
``` npm i
npm i express path favicon logger
npm run build```


## Set up back end

---------- server.js ---------

- Create your server.js (in the list-mania directory)
- Add express, favicon, and logger
- Require your database and create your routers
- Mount middleware and routers
- Identify the port  you want to use and start listening to it
 
```const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('./config/database')

const toDoRouter = require('./routes/api/todos')
const toBuyRouter = require('./routes/api/tobuys')

const app = express()

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/todos', toDoRouter)
app.use('/api/tobuys', toBuyRouter)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
```

------------------
## Connect to your Database
----------- config/database.js ----------
 - require mongoose
 - connect to mongoose
- turn mongoose "on"

```const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://linnae:testing3@cluster0-vvyen.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});```
-----------------
## Create your models
----- models/tobuy.js ------
- require mongoose and get access to the Schemas
- Write the Schema
- Export the model

```var mongoose = require('mongoose')
var Schema = mongoose.Schema

var toBuySchema = new Schema({
  item: {type: String, required: true},
  price: {type: Number},
  purchased: {type: Boolean, default: false}
},{
  timestamps: true
});

module.exports = mongoose.model('ToBuy', toBuySchema);```
-------------------
- do the same to models/todo.js
```var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
  task: {type: String, required: true},
  done: {type: Boolean, default: false}
},{
  timestamps: true
});

module.exports = mongoose.model('Todo', toDoSchema);```

------------------
## Create your Routes

------- routes/api/tobuys.js -------
- bring in your required files/espress/router
- create your routes
- export your router

```const router = require('express').Router();
var tobuysCtrl = require('../../controllers/api/tobuys');

router.get('/', tobuysCtrl.index);
router.get('/:id', tobuysCtrl.show);
router.post('/', tobuysCtrl.create);
router.delete('/:id', tobuysCtrl.delete);
router.put('/:id', tobuysCtrl.update);

module.exports = router;```

------ routes/api/todos.js ------

- add all the same things :) 

```var express = require('express');
var router = express.Router();
var todosCtrl = require('../../controllers/api/todos');

/* GET /api/todos */
router.get('/', todosCtrl.index);
router.get('/:id', todosCtrl.show);
router.post('/', todosCtrl.create);
router.delete('/:id', todosCtrl.delete);
router.put('/:id', todosCtrl.update);

module.exports = router;```

---------------
- in your terminal type:
```nodemon server```
It should return with:

Express app running on port 3001
Connected to MongoDB at
----------------------
## Add your controllers

----------- controllers/api /tobuys.js------------
- Require your model
- Setup you exports
- write your functions 

```const ToBuy = require('../../models/tobuy')

module.exports = {
  index,
  create,
  show, 
  delete: deleteOne, 
  update
}

async function index(req, res) {
  const toBuys = await ToBuy.find({});
  res.status(200).json(toBuys);
}

async function show(req, res) {
  const toBuy = await ToBuy.findById(req.params.id);
  res.status(200).json(toBuy);
}

async function create(req, res) {
  const toBuy = await ToBuy.create(req.body);
  res.status(201).json(toBuy);
}

async function deleteOne(req, res) {
  const deletedToBuy = await ToBuy.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedToBuy);
}

async function update(req, res) {
  const updatedToBuy = await ToBuy.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updatedToBuy);
}```


----------- controllers/api/todos.js -------------
- Add all the same things to todos.js

```const ToDo = require('../../models/todo');

module.exports = {
  index,
  show,
  create,
  delete: deleteOne,
  update
};

async function index(req, res) {
  const toDos = await ToDo.find({});
  res.status(200).json(toDos);
}

async function show(req, res) {
  const toDo = await ToDo.findById(req.params.id);
  res.status(200).json(toDo);
}

async function create(req, res) {
  const toDo = await ToDo.create(req.body);
  res.status(201).json(toDo);
}

async function deleteOne(req, res) {
  const deletedToDo = await ToDo.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedToDo);
}

async function update(req, res) {
  const updatedToDo = await ToDo.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updatedToDo);
}```

-----------
## Set up your proxy so your front end and back end can communicate with each other

-------package.json ------
``` "proxy": "http://localhost:3001"```


-------------
## Check your server... and see if it is still happy. Maybe try postman to be sure everything is ready to go. 
-----------------
--------------------
## Work on your front end! 

- Set up your Router
- npm i react-router-dom
----- index.js ----
- require react-router-dom
``` import {BrowserRouter as Router} from 'react-router-dom' ```
- wrap your React.StrictMode in the Router

```<Router>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Router>,```

  ---- components/Header/Header.jsx -----
  - Create links for your app
  - import React and router

  ```import React from 'react'
import {Link} from 'react-router-dom' ```

- create a functional component with a nav tag that has the following css:

```navbar navbar-expand-lg navbar-light bg-light```

- Add the words List Mania and links for each of your pages (separate each item with a few &nbsp;)

``` <Link to='/'>Home</Link> &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/todos'>To Do List</Link> &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/tobuys'>To Buy List</Link>```


-------- components/App/App.js ---------
- import your header into App, place it in the return and test it out!

- import your pages
```import Header from '../Header/Header'
import TodoPage from '../../pages/TodoPage/TodoPage'
import TobuyPage from '../../pages/TobuyPage/TobuyPage'
import Home from '../../pages/Home/Home'```

- create routes for your pages
  - Home
  - Todo
  - Tobuy

``` <Route exact path='/' render={()=><Home />}/>
      <Route exact path='/todos' render={()=>
        <TodoPage 
        />}
      />
      <Route exact path='/tobuys' render={()=>
        <TobuyPage 
        />}
      />
      ```
-Test our Links and files!

-----------------------
Time to get our data from the backend!

-----src/services/todos-api.js ------ 
- write our base url

```const BASE_URL = '/api/todos';```

- write our different functions
```export function getAll() {
  return fetch(BASE_URL)
  .then(res => res.json());
}

export function create(todo) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(todo)
  }).then(res => res.json());
}

export function update(todo) {
  return fetch(`${BASE_URL}/${todo._id}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(todo)
  }).then(res => res.json());
}

export function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
}```




------ src/components/App/App.jsx -----
- Bring the data in when the component loads

- Import the files
```import * as todosAPI from '../../services/todos-api'```


- write state to hold the data
```state = {
    todos: [],
    tobuys: []
  }```

- write a componentDidMount function to bring in the data

```async componentDidMount() {
    const todos = await todosAPI.getAll()
    const tobuys = await tobuysAPI.getAll()
    console.log('todos', todos)
    console.log('tobuys', tobuys)
    this.setState({
      todos,
      tobuys
    })
  }```

-------------
## Now lets take a look at the components we have ready for us

- TodoPage
- TodoList
- Todo
- Add Todo


Time to write the handleAddTodo function in order to get the add to work

```handleAddTodo = async todo => {
    const newTodo = await todosAPI.create(todo)
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }```

------- src/components/AddTodo.jsx ------
- I just figured out how to make the checkbox work, add this into the handleChange function (at the top of the function)
```if(e.target.name === 'done'){
      e.target.value = !this.state.formData.done
    } ```

- Maybe we have added some we don't want, lets add a handleDeleteTodo

```handleDeleteTodo = async id => {
    await todosAPI.deleteOne(id)
    this.setState({
      todos: this.state.todos.filter(todo => todo._id !== id)
    })
  }```

- Want to cross some things off your list?

```handleUpdateTodo = async updatedTodoData => {
    console.log('handleUpdateTodo')
    const updatedTodo = await todosAPI.update(updatedTodoData)
    const newTodosArray = this.state.todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo)
    this.setState({
      todos: newTodosArray
    })
  }```

- Let's add all those functions for to buy too: 

```handleUpdateTobuy = async updatedTobuyData => {
    const updatedTobuy = await tobuysAPI.update(updatedTobuyData)
    const newTobuysArray = this.state.tobuys.map(tobuy => tobuy._id === updatedTobuy._id ? updatedTobuy : tobuy)
    this.setState({
      tobuys: newTobuysArray
    })
  }

handleDeleteTobuy = async id => {
    await tobuysAPI.deleteOne(id)
    this.setState({
      tobuys: this.state.tobuys.filter(tobuy => tobuy._id !== id)
    })
  }

handleAddTobuy = async tobuy => {
    const newTobuy = await tobuysAPI.create(tobuy)
    this.setState({
      tobuys: [...this.state.tobuys, newTobuy]
    })
  }```




