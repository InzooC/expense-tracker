const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  id: { type: Number, require: false },
  name: { type: String, require: true },
  date: { type: Date, require: true },
  amount: { type: Number, require: true },
  category: { type: String, require: true },
  categoryNumber: { type: Number, require: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  icon: { type: String, require: true }
})

module.exports = mongoose.model('Record', recordSchema)