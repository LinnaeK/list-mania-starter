const ToDo = require('../../models/todo');

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
}