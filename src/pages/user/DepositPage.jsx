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
    icon: <FaBitcoin style={{ color: '#f7931a' }} />,
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
  },
  {
    id: 'eth',
    label: 'Ethereum',
    icon: <FaEthereum style={{ color: '#627eea' }} />,
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'sol',
    label: 'Solana',
    icon: <SiSolana style={{ color: '#00ffa3' }} />,
    address: '6dzE6oE1rjqEoPz2z4n6F8Txg6oVdQ4E5YwXv5HHtX8u'
  },
  {
    id: 'matic',
    label: 'Polygon (MATIC)',
    icon: <SiPolygon style={{ color: '#8247e5' }} />,
    address: '0xF977814e90dA44bFA03b6295A0616a897441aceC'
  }
]

const bankDetails = {
  bank: 'Sample Bank',
  accountName: 'Thunder Xtorm',
  accountNo: '1234567890'
}

const methods = [
  {
    id: 'crypto',
    label: 'Crypto',
    icon: <FaCoins className='method-icon crypto' />,
    desc: 'Deposit with your favorite cryptocurrency'
  },
  {
    id: 'card',
    label: 'Debit/Credit Card',
    icon: <FaRegCreditCard className='method-icon card' />,
    desc: 'Deposit instantly with your card'
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    icon: <FaMoneyCheckAlt className='method-icon bank' />,
    desc: 'Transfer directly from your bank account'
  }
]

export default function DepositPage () {
  const [step, setStep] = useState('select')
  const [method, setMethod] = useState('')
  const [crypto, setCrypto] = useState(CRYPTO_OPTIONS[0].id)
  const [amount, setAmount] = useState('')
  const [uploadImage, setUploadImage] = useState(null)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [showWallet, setShowWallet] = useState(false)

  // Handle deposit method selection
  const handleDeposit = () => {
    if (amount && method) setStep('process')
  }

  const handleUpload = e => {
    if (e.target.files && e.target.files[0]) {
      setUploadImage(e.target.files[0])
    }
  }

  const handleConfirm = e => {
    e.preventDefault()
    setStep('loading')
    setTimeout(() => setStep('receipt'), 1800)
  }

  const handleSubmitProof = e => {
    e.preventDefault()
    setStep('loading')
    setTimeout(() => setStep('done'), 1800)
  }

  // Get selected crypto details
  const selectedCrypto = CRYPTO_OPTIONS.find(c => c.id === crypto)

  return (
    <>
      <MainHeader />
      <div className='deposit-page'>
        {step === 'select' && (
          <div className='deposit-card'>
            <h2>Deposit Funds</h2>
            <p className='deposit-description'>
              Choose your preferred deposit method and enter amount to continue.
            </p>
            <div className='deposit-methods'>
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
            <button
              className='deposit-action-btn'
              onClick={handleDeposit}
              disabled={!method || !amount}
            >
              Continue
            </button>
          </div>
        )}

        {step === 'process' && (
          <div className='deposit-card'>
            <h2>
              {method === 'crypto' && 'Deposit with Crypto'}
              {method === 'bank' && 'Bank Transfer'}
              {method === 'card' && 'Card Payment'}
            </h2>
            <div className='deposit-details'>
              <div className='deposit-summary'>
                <span>Amount:</span>
                <span>
                  <FaWallet className='wallet-icon' /> ${amount}
                </span>
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
                  <div className='wallet-address-box'>
                    <label>{selectedCrypto.label} Wallet Address:</label>
                    <div className='btc-address-row'>
                      <code>{selectedCrypto.address}</code>
                      <button
                        title='Copy'
                        className='copy-btn'
                        onClick={() => {
                          navigator.clipboard.writeText(selectedCrypto.address)
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
                    Kindly Copy and Send
                    <br />
                    <br />
                    <strong>${amount}</strong>
                    <br />
                    <br />
                    or send an equivalent amount of
                    <br />
                    <br />
                    <strong>0.12334 {selectedCrypto.label}</strong>
                    <br />
                    <br />
                    to the above address.
                  </div>
                </>
              )}
              {method === 'bank' && (
                <>
                  <div className='bank-details'>
                    <div>
                      <strong>Bank Name:</strong> {bankDetails.bank}
                    </div>
                    <div>
                      <strong>Account Name:</strong> {bankDetails.accountName}
                    </div>
                    <div>
                      <strong>Account No:</strong> {bankDetails.accountNo}
                    </div>
                  </div>
                  <div className='info-note'>
                    Please transfer <strong>${amount}</strong> to the account
                    above.
                  </div>
                </>
              )}
              {method === 'card' && (
                <>
                  <form className='card-form' onSubmit={handleConfirm}>
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
                      className='deposit-action-btn'
                      type='submit'
                      disabled={
                        cardNumber.replace(/\s/g, '').length < 13 ||
                        !cardExpiry ||
                        !cardCvc
                      }
                    >
                      Confirm Deposit
                    </button>
                  </form>
                </>
              )}
              {(method === 'crypto' || method === 'bank') && (
                <button
                  className='deposit-action-btn'
                  onClick={handleConfirm}
                  style={{ marginTop: 22 }}
                >
                  Confirm Deposit
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className='deposit-card loading'>
            <div className='loader'></div>
            <p>Processing your deposit, please wait...</p>
          </div>
        )}

        {step === 'receipt' && (
          <div className='deposit-card'>
            <h2>Upload Payment Receipt</h2>
            <form className='upload-proof-form' onSubmit={handleSubmitProof}>
              <label>
                Upload proof of payment (screenshot or receipt):
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleUpload}
                  required
                />
              </label>
              {uploadImage && (
                <div className='upload-preview'>
                  <img
                    src={URL.createObjectURL(uploadImage)}
                    alt='Upload Preview'
                  />
                </div>
              )}
              <button className='deposit-action-btn' type='submit'>
                Submit Receipt
              </button>
            </form>
          </div>
        )}

        {step === 'done' && (
          <div className='deposit-card done'>
            <FaCheckCircle
              size={48}
              color='#61CE70'
              style={{ marginBottom: 16 }}
            />
            <h2>Deposit Submitted!</h2>
            <p>
              Your payment receipt has been uploaded.
              <br />
              Our team will verify and credit your account soon.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
