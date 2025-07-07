import React from 'react'
import MainHeader from '../../Components/User/MainHeader'

const dummyLoans = [
  {
    id: 'LN-001',
    amount: 5000,
    term: '6 months',
    status: 'Approved',
    appliedOn: '2025-06-01',
    dueDate: '2025-12-01'
  },
  {
    id: 'LN-002',
    amount: 3000,
    term: '3 months',
    status: 'Pending',
    appliedOn: '2025-07-01',
    dueDate: '2025-10-01'
  },
  {
    id: 'LN-003',
    amount: 10000,
    term: '12 months',
    status: 'Rejected',
    appliedOn: '2025-05-15',
    dueDate: '-'
  }
]

export default function LoansPage () {
  return (
    <div className='loans-page'>
      <MainHeader />
      <div className='loan-container'>
        <h2>My Loans</h2>
        <div className='loan-table-wrapper'>
          <table className='loan-table'>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Amount</th>
                <th>Term</th>
                <th>Status</th>
                <th>Applied On</th>
                <th>Due Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dummyLoans.map((loan, index) => (
                <tr key={index}>
                  <td>{loan.id}</td>
                  <td>${loan.amount.toLocaleString()}</td>
                  <td>{loan.term}</td>
                  <td>
                    <span
                      className={`status-badge ${loan.status.toLowerCase()}`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td>{loan.appliedOn}</td>
                  <td>{loan.dueDate}</td>
                  <td>
                    <button className='view-btn'>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
