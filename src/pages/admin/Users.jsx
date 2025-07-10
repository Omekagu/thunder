import React from 'react'
import AdminHeader from '../../Components/Admin/AdminHeader'
// import Table from '../../Components/Admin/Table'
import UserTable from '../../Components/Admin/Table'

export default function Users () {
  return (
    <div className='admin-users'>
      <AdminHeader />
      <div className='admin-users-header'>
        <UserTable />
      </div>
    </div>
  )
}
