// File: pages/user/buy-coin.jsx
import React, { useState } from 'react'
import MainHeader from '../../Components/User/MainHeader'
// import './BuyCoinPage.scss'

const COINS = ['Bitcoin', 'Ethereum', 'Litecoin', 'Ripple']
const PAYMENTS = ['Credit Card', 'Bank Transfer', 'Crypto Wallet']

export default function BuyCoinPage () {
  const [step, setStep] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState(COINS[0])
  const [amount, setAmount] = useState(0.01)
  const [paymentMethod, setPaymentMethod] = useState(PAYMENTS[0])
  const [processing, setProcessing] = useState(false)

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleConfirm = () => {
    setProcessing(true)
    // Simulate per-method processing
    setTimeout(() => {
      setProcessing(false)
      alert(`${paymentMethod} processed successfully!`)
      setStep(1)
    }, 2000)
  }

  const renderMethodForm = () => {
    switch (paymentMethod) {
      case 'Credit Card':
        return (
          <div className='payment-form'>
            <input type='text' placeholder='Card Number' className='input' />
            <input type='text' placeholder='MM/YY' className='input' />
            <input type='text' placeholder='CVC' className='input short' />
          </div>
        )
      case 'Bank Transfer':
        return (
          <div className='payment-form'>
            <input type='text' placeholder='Account Number' className='input' />
            <input type='text' placeholder='Routing Number' className='input' />
          </div>
        )
      case 'Crypto Wallet':
        return (
          <div className='payment-form'>
            <input type='text' placeholder='Wallet Address' className='input' />
            <button className='button-secondary small'>Connect Wallet</button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='wrapper'>
      <MainHeader />
      <div className='card'>
        <h1 className='title'>Purchase Cryptocurrency</h1>

        {step === 1 && (
          <div className='step'>
            <h2 className='heading'>Step 1: Asset & Amount</h2>
            <div className='field'>
              <label htmlFor='coin' className='label'>
                Crypto Asset
              </label>
              <select
                id='coin'
                value={selectedCoin}
                onChange={e => setSelectedCoin(e.target.value)}
                className='select'
              >
                {COINS.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className='field'>
              <label htmlFor='amount' className='label'>
                Amount
              </label>
              <input
                id='amount'
                type='number'
                step='0.0001'
                min='0'
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                className='input'
              />
            </div>
            <button className='button-primary' onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className='step'>
            <h2 className='heading'>Step 2: Payment Method</h2>
            <div className='options'>
              {PAYMENTS.map(pm => (
                <label key={pm} className='radio-label'>
                  <input
                    type='radio'
                    name='payment'
                    value={pm}
                    checked={paymentMethod === pm}
                    onChange={() => setPaymentMethod(pm)}
                    className='radio-input'
                  />
                  {pm}
                </label>
              ))}
            </div>
            {renderMethodForm()}
            <div className='navigation'>
              <button className='button-secondary' onClick={prevStep}>
                Back
              </button>
              <button className='button-primary' onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='step'>
            <h2 className='heading'>Step 3: Review & Confirm</h2>
            <ul className='summary'>
              <li>
                <strong>Asset:</strong> {selectedCoin}
              </li>
              <li>
                <strong>Amount:</strong> {amount}
              </li>
              <li>
                <strong>Payment:</strong> {paymentMethod}
              </li>
              <li>
                <strong>Est. Total (USD):</strong> $
                {(amount * 50000).toFixed(2)}
              </li>
            </ul>
            <div className='navigation'>
              <button
                className='button-secondary'
                onClick={prevStep}
                disabled={processing}
              >
                Back
              </button>
              <button
                className='button-confirm'
                onClick={handleConfirm}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
