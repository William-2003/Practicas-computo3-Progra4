/* const { default: mongoose } = require('mongoose'); */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandShema = new Schema({
    name: String,
    description: String
});

const Brand = mongoose.model('Brand', brandShema);

module.exports = Brand;