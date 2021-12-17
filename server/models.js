const mongoose = require('mongoose')
// const findOrCreate = require('mongoose-findorcreate')

// let Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  id: Number,
})

const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
})

const MadlibSchema = new mongoose.Schema({
  growUp: String,
  favoriteFood: String,
  loveTodDo: String,
  messageMe: String,
  band: String,
  favoriteHole: String,
  id: Number,
})

// BookSchema.plugin(findOrCreate)

module.exports = { BookSchema, MadlibSchema, UserSchema }
// module.exports = mongoose.model("Person", PersonSchema);
