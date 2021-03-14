const Web3 = require('web3')
require('dotenv').config()
import abi from './abi'
import { getTokenDetails, getValue } from './utils'
import wallets from './wallets'

//instantiate web3
let web3 = new Web3(process.env.INFURA_URL)

async function getBalance(token, walletAddress) {
  let instance = new web3.eth.Contract(abi, token.address)
  let balanceInUnits = await instance.methods.balanceOf(walletAddress).call()
  let balance = await getValue(balanceInUnits, token.decimals)
  console.log(`${walletAddress} : ${token.symbol} Balance - `, balance)
  return Number(balance).toFixed(3)
}

async function getETHBalance(walletAddress) {
  let ethInWei = await web3.eth.getBalance(walletAddress)
  let eth = web3.utils.fromWei(ethInWei, 'ether')
  return Number(eth).toFixed(3)
}

async function calculateBalances() {
  console.log('=======================================')
  console.log('=======================================')
  let tokens = await getTokenDetails()
  let ETHBalance = 0
  let j = 0

  while (j < wallets.length) {
    console.log('Wallet - ', wallets[j].label)
    let balances = []
    let i = 0
    while (i < tokens.length) {
      //only check for ethereum mainnet
      if (tokens[i].chainId == 1) {
        console.log('Token - ', tokens[i].symbol)
        let balance = await getBalance(tokens[i], wallets[j].address)
        //check if balance is > 0
        if (balance > 0) {
          console.log('Found balance in - ', tokens[i].symbol)
          let token = tokens[i]
          token.balance = balance
          //add to wallet balances
          balances.push(token)
          //increment balance in token
          tokens[i].balance += balance
        }
      }
      i++
    }
    wallets[j].tokens = balances.slice()
    //save wallet in db

    //ETHBalance += Number(await getETHBalance(wallets[j].address))
    j++
  }

  console.log(JSON.stringify(wallets))
}
calculateBalances()
