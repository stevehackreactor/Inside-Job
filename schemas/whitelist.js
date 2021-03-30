const mongoose = require('mongoose');
const { Schema } = mongoose;

const whiteList = new Schema({
  word: String
})

module.exports = whiteList;