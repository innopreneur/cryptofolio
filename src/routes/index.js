const express = require('express')
const router = express.Router()
const walletController = require('../controllers/WalletController.js')

let {
  validateWalletReq,
  getAllWallets,
  getWalletByAddress,
  saveWallet,
  updateWallet,
} = walletController

router.post(
  '/wallet',
  [validateWalletReq, saveWallet],
  function (req, res, next) {
    res.status(200).json(req.res.locals.wallet)
  }
)

router.get('/wallets', getAllWallets, function (req, res) {
  res.status(200).json(req.res.locals.wallets)
})

router.get('/wallet', getWalletByAddress, function (req, res) {
  res.status(200).json(req.res.locals.wallet)
})

router.put('/wallet', updateWallet, function (req, res) {
  res.status(200).json(req.res.locals.wallet)
})

module.exports = router
