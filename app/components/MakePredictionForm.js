import React from 'react'
import { Field, reduxForm } from 'redux-form'
import formatBalance from '../util/formatBalance'
import decimalToWeiInt from '../util/decimalToWeiInt'
import EtherDisplaySymbol from './EtherDisplaySymbol'
import TokenSymbolDisplay from './TokenSymbolDisplay'
import { Button, Info, Text, Badge, DropDown } from '@aragon/ui'
import formatPrice from '../util/formatPrice'
import styled from 'styled-components'

const dropDownItems = [
  'EQUAL TO',
  'LESS THAN',
  'MORE THAN'
]

const dropDownDefault = 0

const createReduxForm = reduxForm({ form: 'makePredictionForm' })

const MakePredictionForm = createReduxForm(({
  decision,
  handleSubmit,
  executeBuy,
  pristine,
  submitting,
  tokenBalance
}) => (
  <form onSubmit={handleSubmit(values => {
    if (typeof(values.yesPredictionChoiceIndex) === 'undefined') {
      values.yesPredictionChoiceIndex = dropDownDefault
    }
    if (typeof(values.noPredictionChoiceIndex) === 'undefined') {
      value.noPredictionChoiceIndex = dropDownDefault
    }
    values.collateralAmount = decimalToWeiInt(values.collateralAmount)
    executeBuy({
      decisionId: decision.decisionId,
      ...values
    })
  })}>
    <StyledRow>
      <StyledSmallCaps>question</StyledSmallCaps>
      <br />
      <StyledText size="large">{decision.question}</StyledText>
      <br />
    </StyledRow>
    <br />

    <StyledRow>
      <StyledSmallCaps>Allocate your tokens</StyledSmallCaps>
      <StyledField
        name="collateralAmount"
        component="input"
        type="text"
        placeholder="Enter Amount to Risk"
      />
      <StyledAccountBalance>
        {formatBalance(tokenBalance)} <TokenSymbolDisplay /> Available
      </StyledAccountBalance>
    </StyledRow>

    <ShortLongSelector
      marketKey="yes"
      marketName="YES"
      predictedPrice={decision.yesMarketMarginalPredictedPrice}
    />

    <ShortLongSelector
      marketKey="no"
      marketName="NO"
      predictedPrice={decision.noMarketMarginalPredictedPrice}
    />

    <br />

    <Button mode="strong" type="submit" wide disabled={pristine || submitting}>Make Prediction</Button>
  </form>
))

const ShortLongSelector = ({
  marketKey,
  marketName,
  predictedPrice
}) => (
  <StyledRow>
    <StyledBadge market={marketKey}>{marketName}</StyledBadge>
    <StyledSmallCaps>price will be:</StyledSmallCaps>
    <br />
    <StyledFlexContainer>
      <div>
        <Field
          name={`${marketKey}PredictionChoiceIndex`}
          component={DropDownField}
          defaultValue={dropDownDefault}
        />
      </div>
      <StyledMarketInfo>
        <StyledMarketPrice>
          {formatPrice(predictedPrice)} <EtherDisplaySymbol />
        </StyledMarketPrice>
        <StyledMarketPrediction>Current market prediction</StyledMarketPrediction>
      </StyledMarketInfo>
    </StyledFlexContainer>
  </StyledRow>
)

const DropDownField = (field) => (
  <DropDown
    items={dropDownItems}
    active={field.input.value === '' ? field.defaultValue : field.input.value}
    onChange={field.input.onChange}
  />
)

const StyledAccountBalance = styled.div`
  width: 100%;
  text-align: right;
  color: #43A047;
  font-size: 12px;
  text-transform: uppercase;
  padding: 5px 0px;
`

const StyledBadge = styled(Badge) `
  background-color: ${props => (props.market == 'yes' ? '#80AEDC' : '#39CAD0')};
  color: white;
  font-weight: 400;
  margin-right: 6px;
`

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const StyledMarketPrice = styled(Text) `
  font-size: 14px;
  background-color: #E8E8E8;
  padding: 5px 20px;
  border-radius: 25px;
`

const StyledSmallCaps = styled(Text)`
  text-transform: uppercase;
  font-weight: 500;
  color: #98A0A2;
  font-size: 12px;
  line-height: 28px;
`

const StyledMarketPrediction = styled(Text)`
  display: block;
  text-transform: uppercase;
  color: #98A0A2;
  font-size: 10px;
  line-height: 28px;
`

const StyledMarketInfo = styled.div`
  text-align: right;
`

const StyledField = styled(Field)`
  padding: 8px;
  background: #FFFFFF;
  border: 1px solid rgba(209,209,209,0.75);
  box-shadow: inset 0 2px 3px 0 rgba(0,0,0,0.06);
  outline: none;
  width: 100%;
  border-radius: 3px;
  ::placeholder { opacity: .5; }
`

const StyledText = styled(Text)`
  vertical-align: middle;
  font-weight: bold;
`

const StyledProgressContainer = styled.div`
  height: auto;
  padding: 65px 0px 36px 0px;
`

const StyledRow = styled.div`
  padding: 6px 0px;
`

const StyledInfo = styled(Info.Action)`
  margin: 16px 0;
`

const StyledPermissions = styled(Info.Permissions)`
  margin: 16px 0;
`

const StyledLabel = styled.label`
  font-size: 12px;
  color: #6D777B;
  opacity: .6;
  padding-bottom: 8px;
  text-transform: uppercase;
  display: block;
`

export default MakePredictionForm
