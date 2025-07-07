import React, { useState } from 'react'
import {
  FaBitcoin,
  FaEthereum,
  FaRegCreditCard,
  FaMoneyCheckAlt,
  FaWallet,
  FaCheckCircle,
  FaCoins
} from 'react-icons/fa'
import { SiSolana, SiPolygon } from 'react-icons/si'
import MainHeader from '../../Components/User/MainHeader'

const CRYPTO_OPTIONS = [
  {
    id: 'btc',
    label: 'Bitcoin',
    icon: <FaBitcoin style={{ color: '#f7931a' }} />
  },
  {
    id: 'eth',
    label: 'Ethereum',
    icon: <FaEthereum style={{ color: '#627eea' }} />
  },
  {
    id: 'sol',
    label: 'Solana',
    icon: <SiSolana style={{ color: '#00ffa3' }} />
  },
  {
    id: 'matic',
    label: 'Polygon (MATIC)',
    icon: <SiPolygon style={{ color: '#8247e5' }} />
  }
]

const methods = [
  {
    id: 'crypto',
    label: 'Crypto',
    icon: <FaCoins className='method-icon crypto' />,
    desc: 'Withdraw to your preferred cryptocurrency wallet'
  },
  {
    id: 'card',
    label: 'Debit/Credit Card',
    icon: <FaRegCreditCard className='method-icon card' />,
    desc: 'Withdraw to your debit/credit card'
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    icon: <FaMoneyCheckAlt className='method-icon bank' />,
    desc: 'Withdraw to your bank account'
  }
]

export default function WithdrawalPage () {
  const [step, setStep] = useState('select')
  const [method, setMethod] = useState('')
  const [crypto, setCrypto] = useState(CRYPTO_OPTIONS[0].id)
  const [amount, setAmount] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [bankName, setBankName] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankAccountName, setBankAccountName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [showWallet, setShowWallet] = useState(false)

  // Handle withdrawal method selection
  const handleWithdraw = e => {
    e && e.preventDefault()
    if (
      amount &&
      method &&
      ((method === 'crypto' && walletAddress) ||
        (method === 'bank' && bankName && bankAccount && bankAccountName) ||
        (method === 'card' && cardNumber && cardExpiry && cardCvc))
    ) {
      setStep('process')
    }
  }

  const handleConfirm = e => {
    e.preventDefault()
    setStep('loading')
    setTimeout(() => setStep('done'), 1800)
  }

  // Get selected crypto details
  const selectedCrypto = CRYPTO_OPTIONS.find(c => c.id === crypto)

  return (
    <>
      <MainHeader />
      <div className='withdrawalPage-page'>
        {step === 'select' && (
          <div className='withdrawalPage-card'>
            <h2>Withdraw Funds</h2>
            <p className='withdrawalPage-description'>
              Choose a withdrawal method and enter the amount to continue.
            </p>
            <div className='withdrawalPage-methods'>
              {methods.map(m => (
                <button
                  key={m.id}
                  className={`method-btn${method === m.id ? ' selected' : ''}`}
                  onClick={() => setMethod(m.id)}
                  type='button'
                >
                  {m.icon}
                  <div>
                    <div className='method-label'>{m.label}</div>
                    <div className='method-desc'>{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className='amount-section'>
              <label htmlFor='amount'>Amount (USD):</label>
              <input
                id='amount'
                type='number'
                min='1'
                value={amount}
                onChange={e => setAmount(e.target.value.replace(/^0+/, ''))}
                placeholder='Enter amount'
                autoComplete='off'
              />
            </div>
            {method === 'crypto' && (
              <>
                <div className='crypto-options'>
                  {CRYPTO_OPTIONS.map(c => (
                    <button
                      key={c.id}
                      className={`crypto-btn${
                        crypto === c.id ? ' selected' : ''
                      }`}
                      onClick={() => setCrypto(c.id)}
                      type='button'
                    >
                      {c.icon}
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
                <div className='amount-section'>
                  <label htmlFor='walletAddress'>
                    {selectedCrypto.label} Wallet Address:
                  </label>
                  <input
                    id='walletAddress'
                    type='text'
                    value={walletAddress}
                    onChange={e => setWalletAddress(e.target.value)}
                    placeholder={`Enter your ${selectedCrypto.label} wallet address`}
                    autoComplete='off'
                  />
                </div>
              </>
            )}
            {method === 'bank' && (
              <>
                <div className='amount-section'>
                  <label htmlFor='bankName'>Bank Name:</label>
                  <input
                    id='bankName'
                    type='text'
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    placeholder='Enter your bank name'
                  />
                </div>
                <div className='amount-section'>
                  <label htmlFor='bankAccountName'>Account Name:</label>
                  <input
                    id='bankAccountName'
                    type='text'
                    value={bankAccountName}
                    onChange={e => setBankAccountName(e.target.value)}
                    placeholder='Enter your account name'
                  />
                </div>
                <div className='amount-section'>
                  <label htmlFor='bankAccount'>Account Number:</label>
                  <input
                    id='bankAccount'
                    type='text'
                    value={bankAccount}
                    onChange={e =>
                      setBankAccount(e.target.value.replace(/\D/g, ''))
                    }
                    placeholder='Enter your account number'
                  />
                </div>
              </>
            )}
            {method === 'card' && (
              <>
                <form className='card-form' onSubmit={handleWithdraw}>
                  <div className='form-row'>
                    <label htmlFor='cardNumber'>Card Number:</label>
                    <input
                      type='text'
                      id='cardNumber'
                      maxLength={19}
                      value={cardNumber}
                      onChange={e =>
                        setCardNumber(
                          e.target.value
                            .replace(/\D/g, '')
                            .replace(/(.{4})/g, '$1 ')
                            .trim()
                        )
                      }
                      placeholder='1234 5678 9012 3456'
                      required
                    />
                  </div>
                  <div className='form-row double'>
                    <div>
                      <label htmlFor='cardExpiry'>Expiry:</label>
                      <input
                        type='text'
                        id='cardExpiry'
                        maxLength={5}
                        value={cardExpiry}
                        onChange={e =>
                          setCardExpiry(
                            e.target.value
                              .replace(/[^0-9/]/g, '')
                              .replace(/^(\d{2})(\d)/, '$1/$2')
                          )
                        }
                        placeholder='MM/YY'
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='cardCvc'>CVC:</label>
                      <input
                        type='text'
                        id='cardCvc'
                        maxLength={4}
                        value={cardCvc}
                        onChange={e =>
                          setCardCvc(e.target.value.replace(/\D/g, ''))
                        }
                        placeholder='123'
                        required
                      />
                    </div>
                  </div>
                  <button
                    className='withdrawalPage-action-btn'
                    type='submit'
                    disabled={
                      cardNumber.replace(/\s/g, '').length < 13 ||
                      !cardExpiry ||
                      !cardCvc ||
                      !amount
                    }
                  >
                    Continue
                  </button>
                </form>
              </>
            )}
            {(method === 'crypto' || method === 'bank') && (
              <button
                className='withdrawalPage-action-btn'
                onClick={handleWithdraw}
                style={{ marginTop: 22 }}
                disabled={
                  !amount ||
                  (method === 'crypto' && !walletAddress) ||
                  (method === 'bank' &&
                    (!bankName || !bankAccount || !bankAccountName))
                }
              >
                Continue
              </button>
            )}
          </div>
        )}

        {step === 'process' && (
          <div className='withdrawalPage-card'>
            <h2>Confirm Withdrawal</h2>
            <div className='withdrawalPage-details'>
              <div className='withdrawalPage-summary'>
                <span>Amount:</span>
                <span>
                  <FaWallet className='wallet-icon' /> ${amount}
                </span>
              </div>
              {method === 'crypto' && (
                <>
                  <div className='crypto-options'>
                    <span
                      style={{
                        margin: '0 auto',
                        fontWeight: 600,
                        color: '#61CE70'
                      }}
                    >
                      {selectedCrypto.icon} {selectedCrypto.label}
                    </span>
                  </div>
                  <div className='wallet-address-box'>
                    <label>To Address:</label>
                    <div className='btc-address-row'>
                      <code>{walletAddress}</code>
                      <button
                        title='Copy'
                        className='copy-btn'
                        onClick={() => {
                          navigator.clipboard.writeText(walletAddress)
                          setShowWallet(true)
                          setTimeout(() => setShowWallet(false), 1200)
                        }}
                      >
                        Copy
                      </button>
                    </div>
                    {showWallet && (
                      <span className='copied-message'>Copied!</span>
                    )}
                  </div>
                  <div className='info-note'>
                    Your withdrawal will be processed to this address.
                  </div>
                </>
              )}
              {method === 'bank' && (
                <>
                  <div className='bank-details'>
                    <div>
                      <strong>Bank Name:</strong> {bankName}
                    </div>
                    <div>
                      <strong>Account Name:</strong> {bankAccountName}
                    </div>
                    <div>
                      <strong>Account No:</strong> {bankAccount}
                    </div>
                  </div>
                  <div className='info-note'>
                    Your withdrawal will be processed to this bank account.
                  </div>
                </>
              )}
              {method === 'card' && (
                <>
                  <div className='bank-details'>
                    <div>
                      <strong>Card Number:</strong> {cardNumber}
                    </div>
                    <div>
                      <strong>Expiry:</strong> {cardExpiry}
                    </div>
                  </div>
                  <div className='info-note'>
                    Your withdrawal will be processed to this card.
                  </div>
                </>
              )}
              <button
                className='withdrawalPage-action-btn'
                onClick={handleConfirm}
                style={{ marginTop: 22 }}
              >
                Confirm Withdrawal
              </button>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className='withdrawalPage-card loading'>
            <div className='loader'></div>
            <p>Processing your withdrawal, please wait...</p>
          </div>
        )}

        {step === 'done' && (
          <div className='withdrawalPage-card done'>
            <FaCheckCircle
              size={48}
              color='#61CE70'
              style={{ marginBottom: 16 }}
            />
            <h2>Withdrawal Submitted!</h2>
            <p>
              Your withdrawal request has been received.
              <br />
              Our team will process and send funds to your selected account
              soon.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
