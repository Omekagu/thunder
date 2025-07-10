import React from 'react'
import AdminHeader from '../../Components/Admin/AdminHeader'
import RevenueCard from '../../Components/Admin/RevenueCard'
import DonutChart from '../../Components/Admin/DonutChart'
import GradientLineChart from '../../Components/Admin/GradientLineChart'

export default function AdminDashboard () {
  return (
    <div className='admin-dashboard'>
      <AdminHeader />
      <div className='revenue-cards-container'>
        <RevenueCard
          title='Total Investors'
          value={'1,300'}
          date='Jan 01 - Jan 10'
        />
        <RevenueCard
          title='Investment Revenue'
          value={'$4,900,032'}
          date='Jan 01 - Jan 10'
        />
        <RevenueCard
          title='Buyers Revenue'
          value={'$4,000,032'}
          date='Jan 01 - Jan 10'
        />
        <RevenueCard
          title='Sellers Revenue'
          value={'$23,000,432'}
          date='Jan 01 - Jan 10'
        />
      </div>
      <div className='charts-container'>
        <DonutChart />
        <GradientLineChart />
      </div>
    </div>
  )
}
