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

// handle game schedule request
router.post(
  '/wallet',
  [validateWalletReq, saveWallet],
  function (req, res, next) {
    res.status(200).json(req.res.locals.wallet)
  }
)

// handle game schedule request
router.get('/wallets', getAllWallets, function (req, res) {
  res.status(200).json(req.res.locals.wallets)
})

// handle game schedule request
router.get('/wallet', getWalletByAddress, function (req, res) {
  res.status(200).json(req.res.locals.wallet)
})

// handle game schedule request
router.put('/wallet', updateWallet, function (req, res) {
  res.status(200).json(req.res.locals.wallet)
})

module.exports = router
