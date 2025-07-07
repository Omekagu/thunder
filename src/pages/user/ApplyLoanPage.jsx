import React, { useState } from 'react'
import MainHeader from '../../Components/User/MainHeader'

export default function ApplyLoanPage () {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    employmentStatus: '',
    salary: '',
    loanAmount: '',
    loanPurpose: '',
    loanTerm: '',
    bankAccount: '',
    idFile: null,
    proofOfIncome: null,
    bankStatement: null
  })

  const handleChange = e => {
    const { name, value, files } = e.target
    if (files) {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Validate and send to backend
    console.log('Submitted:', formData)
  }

  return (
    <div className='apply-loan'>
      <MainHeader />
      <div className='form-container'>
        <h2>Loan Application</h2>
        <form onSubmit={handleSubmit}>
          <div className='section'>
            <h3>Personal Information</h3>
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type='tel'
              name='phone'
              placeholder='Phone Number'
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type='date'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='address'
              placeholder='Residential Address'
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className='section'>
            <h3>Employment & Income</h3>
            <select
              name='employmentStatus'
              value={formData.employmentStatus}
              onChange={handleChange}
              required
            >
              <option value=''>-- Employment Status --</option>
              <option value='employed'>Employed</option>
              <option value='self-employed'>Self-Employed</option>
              <option value='unemployed'>Unemployed</option>
            </select>
            <input
              type='number'
              name='salary'
              placeholder='Monthly Salary ($)'
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className='section'>
            <h3>Loan Details</h3>
            <input
              type='number'
              name='loanAmount'
              placeholder='Loan Amount ($)'
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='loanPurpose'
              placeholder='Loan Purpose'
              value={formData.loanPurpose}
              onChange={handleChange}
              required
            />
            <select
              name='loanTerm'
              value={formData.loanTerm}
              onChange={handleChange}
              required
            >
              <option value=''>-- Loan Term --</option>
              <option value='3'>3 Months</option>
              <option value='6'>6 Months</option>
              <option value='12'>12 Months</option>
            </select>
          </div>

          <div className='section'>
            <h3>Bank Details</h3>
            <input
              type='text'
              name='bankAccount'
              placeholder='Bank Account Number'
              value={formData.bankAccount}
              onChange={handleChange}
              required
            />
          </div>

          <div className='section'>
            <h3>Document Upload</h3>
            <label>ID Upload:</label>
            <input
              type='file'
              name='idFile'
              accept='.pdf,.jpg,.png'
              onChange={handleChange}
              required
            />
            <label>Proof of Income:</label>
            <input
              type='file'
              name='proofOfIncome'
              accept='.pdf,.jpg,.png'
              onChange={handleChange}
              required
            />
            <label>Bank Statement:</label>
            <input
              type='file'
              name='bankStatement'
              accept='.pdf,.jpg,.png'
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit' className='submit-btn'>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}
