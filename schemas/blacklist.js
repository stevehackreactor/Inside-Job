const mongoose = require('mongoose');
const { Schema } = mongoose;

const blackList = new Schema({
  word: String
})

module.exports = blackList;