import { log } from '@graphprotocol/graph-ts'
import {
  PairFactory,
  Exchange,
  Buy as BuyEvent,
  Sell as SellEvent,
  Redeem as RedeemEvent,
} from "../../generated/schema"

import { Buy, Sell, Redeem, Exchange as ExchangeContract } from '../../generated/templates/Exchange/Exchange'
import { updateExchangeHourData, updateExchangeDayData, updateVerseDayData } from './dayUpdates'
import {
  PAIR_FACTORY_ADDRESS,
  MAX_RATIO,
  updatePosition,
  setUser,
  ONE_BI,
} from './helpers'

// buy events
export function handleBuy(event: Buy): void {
  let buyer = event.params.buyer
  setUser(buyer)
  // get exchange object from schema 
  let exchange = Exchange.load(event.address.toHexString())
  if (exchange === null) {
    log.error('Exchange is null', [event.address.toHexString()])
    throw new Error("Exchange is null")
  }
  let verse = PairFactory.load(PAIR_FACTORY_ADDRESS)
  if (verse === null) {
    log.error('Pair Factory is null', [event.address.toHexString()])
    throw new Error("Pair Factory is null")
  }
  // get exchange contract from chain
  let exchangeContract = ExchangeContract.bind(event.address)
  let amount = event.params.tokens
  let price = event.params.price
  let buy = new BuyEvent(event.transaction.hash
    .toHexString())
  buy.blockNumber = event.block.number
  buy.timestamp = event.block.timestamp
  buy.exchange = exchange.id
  buy.amount = amount
  buy.price = price
  buy.buyer = buyer
  buy.save()
  updatePosition(event.address, buyer, exchangeContract.balanceOf(buyer))

  // update calculated and derived fields based on data pulled directly from contract
  let poolBalance = event.params.poolBalance
  let totalSupply = event.params.totalSupply
  exchange.poolBalance = poolBalance
  exchange.totalSupply = totalSupply
  exchange.tokenPriceNumerator = (exchange.poolBalance).times(MAX_RATIO)
  exchange.tokenPriceDenominator = (exchange.totalSupply).times(exchange.reserveRatio)
  exchange.save()

  // update hourly, daily, and global values
  // global Verse
  verse.totalVolumeETH = verse.totalVolumeETH.plus(price)
  verse.txCount = verse.txCount.plus(ONE_BI)
  verse.save()

  // daily Verse
  let verseDayData = updateVerseDayData(event)
  verseDayData.dailyVolumeETH = verseDayData.dailyVolumeETH.plus(price)
  verseDayData.txCount
  verseDayData.save()

  // exchange
  exchange.volumeETH = exchange.volumeETH.plus(price)
  exchange.txCount = exchange.txCount.plus(ONE_BI)
  exchange.save()
  
  // daily exchange
  let exchangeDayData = updateExchangeDayData(event)
  exchangeDayData.dailyVolumeETH = exchangeDayData.dailyVolumeETH.plus(price)
  exchangeDayData.dailyVolumeToken = exchangeDayData.dailyVolumeToken.plus(amount)
  exchangeDayData.tokenPriceNumerator = exchange.tokenPriceNumerator
  exchangeDayData.tokenPriceDenominator = exchange.tokenPriceDenominator
  exchangeDayData.save()

  // hourly exchange
  let exchangeHourData = updateExchangeHourData(event)
  exchangeHourData.hourlyVolumeETH = exchangeHourData.hourlyVolumeETH.plus(price)
  exchangeHourData.hourlyVolumeToken = exchangeHourData.hourlyVolumeToken.plus(amount)
  exchangeHourData.save()
}

export function handleSell(event: Sell): void {
  let seller = event.params.seller
  setUser(seller)
  let exchange = Exchange.load(event.address.toHexString())
  if (exchange === null) {
    log.error('Exchange is null', [event.address.toHexString()])
    throw new Error("Exchange is null")
  }
  let verse = PairFactory.load(PAIR_FACTORY_ADDRESS)
  if (verse === null) {
    log.error('Pair Factory is null', [event.address.toHexString()])
    throw new Error("Pair Factory is null")
  }
  // get exchange contract from chain
  let exchangeContract = ExchangeContract.bind(event.address)
  let amount = event.params.tokens
  let price = event.params.eth
  let sell = new SellEvent(event.transaction.hash
    .toHexString())
  sell.blockNumber = event.block.number
  sell.timestamp = event.block.timestamp
  sell.exchange = exchange.id
  sell.amount = amount
  sell.price = price
  sell.seller = seller
  sell.save()
  updatePosition(event.address, seller, exchangeContract.balanceOf(seller))
  // update calculated and derived fields based on data pulled directly from contract
  let poolBalance = event.params.poolBalance
  let totalSupply = event.params.totalSupply
  exchange.poolBalance = poolBalance
  exchange.totalSupply = totalSupply
  exchange.tokenPriceNumerator = (exchange.poolBalance).times(MAX_RATIO)
  exchange.tokenPriceDenominator = (exchange.totalSupply).times(exchange.reserveRatio)

  // update hourly, daily, and global values
  // global Verse
  verse.totalVolumeETH = verse.totalVolumeETH.plus(price)
  verse.txCount = verse.txCount.plus(ONE_BI)
  verse.save()

  // daily Verse
  let verseDayData = updateVerseDayData(event)
  verseDayData.dailyVolumeETH = verseDayData.dailyVolumeETH.plus(price)
  verseDayData.txCount
  verseDayData.save()

  // exchange
  exchange.volumeETH = exchange.volumeETH.plus(price)
  exchange.txCount = exchange.txCount.plus(ONE_BI)
  exchange.save()
  
  // daily exchange
  let exchangeDayData = updateExchangeDayData(event)
  exchangeDayData.dailyVolumeETH = exchangeDayData.dailyVolumeETH.plus(price)
  exchangeDayData.dailyVolumeToken = exchangeDayData.dailyVolumeToken.plus(amount)
  exchangeDayData.tokenPriceNumerator = exchange.tokenPriceNumerator
  exchangeDayData.tokenPriceDenominator = exchange.tokenPriceDenominator
  exchangeDayData.save()

  // hourly exchange
  let exchangeHourData = updateExchangeHourData(event)
  exchangeHourData.hourlyVolumeETH = exchangeHourData.hourlyVolumeETH.plus(price)
  exchangeHourData.hourlyVolumeToken = exchangeHourData.hourlyVolumeToken.plus(amount)
  exchangeDayData.tokenPriceNumerator = exchange.tokenPriceNumerator
  exchangeDayData.tokenPriceDenominator = exchange.tokenPriceDenominator
  exchangeHourData.save()
}

export function handleRedeem(event: Redeem): void {
  let redeemer = event.params.redeemer
  setUser(redeemer)
  let exchange = Exchange.load(event.address.toHexString())
  if (exchange === null) {
    log.error('Exchange is null', [event.address.toHexString()])
    throw new Error("Exchange is null")
  }
  let verse = PairFactory.load(PAIR_FACTORY_ADDRESS)
  if (verse === null) {
    log.error('Pair Factory is null', [event.address.toHexString()])
    throw new Error("Pair Factory is null")
  }
  // get exchange contract from chain
  let exchangeContract = ExchangeContract.bind(event.address)
  let redemption = new RedeemEvent(event.transaction.hash
    .toHexString())
  redemption.blockNumber = event.block.number
  redemption.timestamp = event.block.timestamp
  redemption.exchange = exchange.id
  redemption.redeemer = redeemer
  redemption.save()
  updatePosition(event.address, redeemer, exchangeContract.balanceOf(redeemer))
}

