const mongoose = require('mongoose')
const WalletSchema = require('../schemas/WalletSchema').WalletSchema

let WalletModel = mongoose.model('wallet', WalletSchema)

//save new wallet
export async function saveNewWallet(newWallet) {
  let wallet = new WalletModel(newWallet)

  let result = await WalletModel.find({ address: newWallet.address })
  console.log(result)
  if (result.length) {
    return false
  }
  let saved = await wallet.save()
  return saved
}

//find all wallets
export async function getWallet(address) {
  return WalletModel.find({ address }).exec()
}

//find all active games
export async function getAllWallets() {
  return WalletModel.find({}).exec()
}

export async function updateWallet(address, tokens) {
  return WalletModel.updateOne({ address }, { tokens }).exec()
}
