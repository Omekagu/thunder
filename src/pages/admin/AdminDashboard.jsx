import React from 'react'
import AdminHeader from '../../Components/Admin/AdminHeader'
import RevenueCard from '../../Components/Admin/RevenueCard'

export default function AdminDashboard () {
  return (
    <div>
      <AdminHeader />
      <div className='revenue-cards-container'>
        <RevenueCard
          title='Total Investors'
          value={'1,300'}
          date='Jan 01 - Jan 10'
        />
        <RevenueCard
          title='Investors Revenue'
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
    </div>
  )
}
