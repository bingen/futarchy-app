import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import MarketPricesLineChart from '../components/MarketPricesLineChart'
import tradePriceHistory from '../reducers/computed/tradePriceHistory'

const pricePointIncrement = 60 * 60 * 24 // 1 day

const mapStateToProps = (state, ownProps) => {
  const { trades } = state
  const { decisionId } = ownProps

  const hist = tradePriceHistory({
    decisionId,
    trades,
    increment: pricePointIncrement,
    now: state.blocktime
  })

  return {
    yesPrices: _.map(hist.yesHistory, point => point.price),
    noPrices: _.map(hist.noHistory, point => point.price)
  }
}

export default connect(
  mapStateToProps
)(MarketPricesLineChart)
