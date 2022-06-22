const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  id: { type: Number, require: false },
  name: { type: String, require: true },
  date: { type: Date, require: true },
  amount: { type: Number, require: true },
  category: { type: String, require: true },
  categoryNumber: { type: Number, require: true }
  // ,  還沒建立關聯變項
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   index: true,
  //   required: true
  // }
  // ,  還沒建立關聯變項
  // categoryId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category',
  //   index: true,
  //   required: true
  // }
})

module.exports = mongoose.model('Record', recordSchema)