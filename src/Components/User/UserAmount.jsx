import React from 'react'
// import { RiDownload2Line, RiUpload2Line } from 'react-icons/ri'
import Link from 'next/link'

export default function UserAmount () {
  return (
    <section className='user-amount-card'>
      <div className='user-amount-header'>
        <img
          src='https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
          alt='Profile'
          className='user-profile-img'
        />
        <div className='user-greeting-area'>
          <span className='user-greeting'>Good Morning</span>
          <span className='user-name'>Hi, Angela Zoey.</span>
        </div>
      </div>
      <hr className='user-divider' />
      <div className='user-balance-row'>
        <span className='user-balance-label'>Wallet balance</span>
      </div>
      <div className='user-balance-amount'>$1050.99</div>
      <div className='user-actions-row'>
        <button className='user-action-btn'>
          <Link href={'/user/deposit'}>
            {/* <RiDownload2Line className='action-icon' /> */}
            Deposit
          </Link>
        </button>
        <span className='user-action-divider' />
        <button className='user-action-btn'>
          <Link href={'/user/withdrawal'}>
            {/* <RiUpload2Line className='user-action-icon' /> */}
            Withdraw
          </Link>
        </button>
      </div>
    </section>
  )
}
