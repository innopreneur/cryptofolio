import axios from "axios"
import { BigNumber } from "bignumber.js"
require("dotenv").config()

export async function getTokenDetails() {
  let resp = await axios(process.env.TOKENS_URL)
  let tokens = resp.data.tokens
  console.log(tokens)
  return tokens
}

export async function getValue(raw, decimals) {
  let unit = new BigNumber(10).pow(parseInt(decimals))
  return new BigNumber(raw).div(unit).toNumber()
}
