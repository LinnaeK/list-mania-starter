const ToBuy = require('../../models/tobuy')

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
}