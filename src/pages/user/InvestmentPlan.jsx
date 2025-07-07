import React from 'react'
import InvestmentPlanComponent from '../../Components/User/InvestmentplanComponent'
import MainHeader from '../../Components/User/MainHeader'

export default function InvestmentPlan () {
  return (
    <div className='investmentplans'>
      <MainHeader />
      <main>
        <InvestmentPlanComponent />
      </main>
    </div>
  )
}
