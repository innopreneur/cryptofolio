const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.WalletSchema = new Schema({
  address: { type: String, required: true },
  label: { type: String },
  tokens: [
    {
      address: { type: String, required: true },
      name: { type: String, required: true },
      symbol: String,
      logoURI: String,
      decimals: Number,
      chainId: Number,
      balance: { type: String, required: true, default: 0 },
      lastModifiedOn: Date,
      createdOn: Date,
    },
  ],
})
