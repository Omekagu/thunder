import React, { useState } from 'react'
import { FaCopy, FaUserPlus } from 'react-icons/fa'
import MainHeader from '../../Components/User/MainHeader'

const dummyReferrals = [
  {
    name: 'Jane Doe',
    joined: '2025-06-16',
    earnings: 15.5,
    email: 'jane@example.com'
  },
  {
    name: 'Alex Smith',
    joined: '2025-06-12',
    earnings: 10,
    email: 'alex.smith@mail.com'
  },
  {
    name: 'Priya Patel',
    joined: '2025-06-01',
    earnings: 22.2,
    email: 'priya.patel@mail.com'
  },
  {
    name: 'Samuel Lee',
    joined: '2025-05-28',
    earnings: 0,
    email: 'samlee@mail.com'
  }
]

const referralLink = 'https://thunderxtorm.com/signup?ref=Omekagu'

export default function ReferralPage () {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 900)
  }

  return (
    <div className='referral-page'>
      <>
        <MainHeader />
      </>
      <div className='referral-card'>
        <h2>
          <FaUserPlus style={{ marginRight: 7, color: '#61CE70' }} />
          Invite & Earn
        </h2>
        <p className='referral-desc'>Earn rewards for each referral</p>

        <div className='referral-link-row'>
          <input
            type='text'
            readOnly
            value={referralLink}
            className='referral-link-input'
          />
          <button className='copy-btn' onClick={handleCopy}>
            <FaCopy />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className='referral-tip'>
          You earn a bonus of
          <span className='reward-amount'> $10.</span>
        </div>
      </div>

      <div className='referral-list-card'>
        <h3>People You’ve Referred</h3>
        <div className='referral-list-header'>
          <span>Name</span>
          <span>Date Joined</span>
          <span>Earnings</span>
        </div>
        <div className='referral-list'>
          {dummyReferrals.length === 0 ? (
            <div className='no-referrals'>
              No referrals yet. Start sharing your link!
            </div>
          ) : (
            dummyReferrals.map((ref, idx) => (
              <div className='referral-list-item' key={ref.email + idx}>
                <span>
                  <span className='ref-icon'>{ref.name[0]}</span>
                  <span className='ref-name'>{ref.name}</span>
                </span>
                <span>{ref.joined}</span>
                <span className='ref-earning'>
                  {ref.earnings > 0 ? (
                    `$${ref.earnings.toFixed(2)}`
                  ) : (
                    <span className='pending'>Pending</span>
                  )}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
