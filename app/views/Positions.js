import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import decisionStatuses from '../constants/decisionStatuses'
import PerformanceTotalsContainer from '../containers/PerformanceTotalsContainer'
import MyDecisionsBadgeContainer from '../containers/MyDecisionsBadgeContainer'
import DecisionsTableContainer from '../containers/DecisionsTableContainer'

const decisionLabelsMap = {
  OPEN: 'My Open Decisions',
  RESOLVED: 'My Resolved Decisions',
  CLOSED: 'My Closed Decisions'
}

const Positions = () => (
  <ViewElem>
    <TableTitle>My Totals</TableTitle>
    <PerformanceTotalsContainer />
    <br /><br />

    {_.values(decisionStatuses).map(decisionState => (
      <DecisionSummarySection key={decisionState}>
        <div>
          <TableTitle>
            {decisionLabelsMap[decisionState]}
            <DecisionsCountBadge>
              <MyDecisionsBadgeContainer statusFilter={decisionState} />
            </DecisionsCountBadge>
          </TableTitle>
        </div>
        <DecisionsTableContainer statusFilter={decisionState} />
      </DecisionSummarySection>
    ))}

  </ViewElem>
)

const ViewElem = styled.div`
  width: 100%;
`

const DecisionsCountBadge = styled.span`
  margin-left: 15px;
`

const DecisionSummarySection = styled.div`
  margin-bottom: 65px;
`

const TableTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

export default Positions
