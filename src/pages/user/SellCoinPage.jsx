import React, { useState, useEffect } from 'react'
import MainHeader from '../../Components/User/MainHeader'

// Mock wallet tokens with addresses
const WALLET_TOKENS = [
  {
    symbol: 'BTC',
    balance: 0.125,
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
  },
  {
    symbol: 'ETH',
    balance: 2.5,
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  { symbol: 'LTC', balance: 10, address: 'LcHK2vUozbV8agUWyDuV8W8XvYtWbdApF3' },
  { symbol: 'XRP', balance: 500, address: 'rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh' }
]
const PAYOUT_METHODS = ['Bank Transfer', 'PayPal', 'Internal Wallet']

export default function SellCoinPage () {
  const [step, setStep] = useState(1)
  const [token, setToken] = useState(WALLET_TOKENS[0].symbol)
  const [balance, setBalance] = useState(WALLET_TOKENS[0].balance)
  const [address, setAddress] = useState(WALLET_TOKENS[0].address)
  const [amount, setAmount] = useState(0)
  const [payout, setPayout] = useState(PAYOUT_METHODS[0])
  const [fee, setFee] = useState(0)
  const [net, setNet] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [txId, setTxId] = useState('')

  // On token change, update balance/address and reset fields
  useEffect(() => {
    const sel = WALLET_TOKENS.find(t => t.symbol === token)
    setBalance(sel ? sel.balance : 0)
    setAddress(sel ? sel.address : '')
    setAmount(0)
    setFee(0)
    setNet(0)
  }, [token])

  // Calculate fee (1%) and net proceeds
  useEffect(() => {
    const calculatedFee = parseFloat((amount * 0.01).toFixed(6))
    const calculatedNet = parseFloat((amount - calculatedFee).toFixed(6))
    setFee(calculatedFee)
    setNet(calculatedNet)
  }, [amount])

  const next = () => setStep(s => Math.min(s + 1, 3))
  const back = () => setStep(s => Math.max(s - 1, 1))

  const confirmSell = () => {
    setProcessing(true)
    // Simulate blockchain tx & company payout
    setTimeout(() => {
      const mockId = Math.random().toString(36).substr(2, 10).toUpperCase()
      setTxId(mockId)
      setProcessing(false)
      setStep(4)
    }, 2000)
  }

  return (
    <>
      <MainHeader />
      <div className='sell-container'>
        <div className='sell-panel'>
          <h1 className='sell-title'>Sell Your Tokens</h1>

          <div className='steps'>
            {['Select', 'Review', 'Submit', 'Receipt'].map((label, i) => (
              <div key={i} className={step === i + 1 ? 'step active' : 'step'}>
                {i + 1}. {label}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className='form-section'>
              <label>Choose Token (Balance)</label>
              <select value={token} onChange={e => setToken(e.target.value)}>
                {WALLET_TOKENS.map(t => (
                  <option key={t.symbol} value={t.symbol}>
                    {t.symbol} ({t.balance})
                  </option>
                ))}
              </select>
              <label>Wallet Address</label>
              <input type='text' value={address} readOnly />
              <button className='btn primary' onClick={next}>
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className='form-section'>
              <label>Amount to Sell (Max {balance})</label>
              <input
                type='number'
                min='0'
                max={balance}
                step='0.000001'
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value) || 0)}
              />
              <div className='info-row'>
                <span>Transaction Fee (1%):</span>
                <span>{fee}</span>
              </div>
              <div className='info-row'>
                <span>Net Proceeds:</span>
                <span>{net}</span>
              </div>
              <label>Payout Method</label>
              <select value={payout} onChange={e => setPayout(e.target.value)}>
                {PAYOUT_METHODS.map(m => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <div className='actions'>
                <button className='btn secondary' onClick={back}>
                  Back
                </button>
                <button
                  className='btn primary'
                  onClick={next}
                  disabled={amount <= 0}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='form-section'>
              <h3>Confirm Sale</h3>
              <p>
                Token: <strong>{token}</strong>
              </p>
              <p>
                Amount: <strong>{amount}</strong>
              </p>
              <p>
                Fee: <strong>{fee}</strong>
              </p>
              <p>
                Net Proceeds: <strong>{net}</strong>
              </p>
              <p>
                Payout via: <strong>{payout}</strong>
              </p>
              <div className='actions'>
                <button
                  className='btn secondary'
                  onClick={back}
                  disabled={processing}
                >
                  Back
                </button>
                <button
                  className='btn primary'
                  onClick={confirmSell}
                  disabled={processing}
                >
                  {processing ? 'Processing Withdrawal...' : 'Submit Sale'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='receipt-section'>
              <h3>Sale Receipt</h3>
              <p>
                Transaction ID: <strong>{txId}</strong>
              </p>
              <p>
                Sold:{' '}
                <strong>
                  {amount} {token}
                </strong>
              </p>
              <p>
                Fee Paid: <strong>{fee}</strong>
              </p>
              <p>
                Net Received: <strong>{net}</strong>
              </p>
              <p>
                Payout Method: <strong>{payout}</strong>
              </p>
              <button className='btn success' onClick={() => setStep(1)}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
