import React, { useState, useEffect } from 'react'
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaChartLine,
  FaSignOutAlt,
  FaExpand,
  FaMoneyCheckAlt,
  FaPiggyBank,
  FaCreditCard,
  FaHistory,
  FaIdBadge,
  FaKey,
  FaExchangeAlt
} from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

// Supported chains and popular tokens (expand as needed)
const CHAINS = [
  {
    id: 1,
    name: 'Ethereum',
    explorer: 'https://etherscan.io/tx/',
    rpc: 'https://mainnet.infura.io/v3/',
    native: { symbol: 'ETH', decimals: 18 },
    tokens: [
      { name: 'ETH (native)', address: null, decimals: 18 },
      {
        name: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6
      },
      {
        name: 'USDC',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48',
        decimals: 6
      }
    ]
  },
  {
    id: 56,
    name: 'BSC',
    explorer: 'https://bscscan.com/tx/',
    rpc: 'https://bsc-dataseed.binance.org/',
    native: { symbol: 'BNB', decimals: 18 },
    tokens: [
      { name: 'BNB (native)', address: null, decimals: 18 },
      {
        name: 'USDT',
        address: '0x55d398326f99059fF775485246999027B3197955',
        decimals: 18
      },
      {
        name: 'BUSD',
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        decimals: 18
      }
    ]
  },
  {
    id: 137,
    name: 'Polygon',
    explorer: 'https://polygonscan.com/tx/',
    rpc: 'https://polygon-rpc.com/',
    native: { symbol: 'MATIC', decimals: 18 },
    tokens: [
      { name: 'MATIC (native)', address: null, decimals: 18 },
      {
        name: 'USDT',
        address: '0x3813e82e6f7098b9583FC0F33a962D02018B6803',
        decimals: 6
      },
      {
        name: 'USDC',
        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        decimals: 6
      }
    ]
  }
]

const ERC20_ABI = [
  'function transfer(address to, uint256 value) public returns (bool)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint)'
]

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: CHAINS[0].rpc,
          56: CHAINS[1].rpc,
          137: CHAINS[2].rpc
        }
      }
    }
  }
})

export default function MainHeader () {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Web3 state
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [walletAddress, setWalletAddress] = useState(null)
  const [chainId, setChainId] = useState(1)
  const [balances, setBalances] = useState([])
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(0)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [txHash, setTxHash] = useState(null)
  const [web3Error, setWeb3Error] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Sidebar structure with headers and sub-links
  const sidebarSections = [
    {
      header: null,
      links: [
        { icon: <FaHome />, label: 'Dashboard', path: '/user/dashboard' },
        { icon: <FaUser />, label: 'Profile', path: '/user/profile' }
      ]
    },
    {
      header: 'Investment Plans',
      links: [
        {
          icon: <FaPiggyBank />,
          label: 'All Plans',
          path: '/user/investmentPlans'
        },
        {
          icon: <FaChartLine />,
          label: 'Active Investments',
          path: '/user/investmentPlans/active'
        },
        {
          icon: <FaChartLine />,
          label: 'Earnings',
          path: '/user/investmentPlans/earnings'
        }
      ]
    },
    {
      header: 'Loans',
      links: [
        { icon: <FaMoneyCheckAlt />, label: 'My Loans', path: '/user/Loans' },
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Apply for Loan',
          path: '/user/Loans/apply'
        },
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Loan History',
          path: '/user/Loans/history'
        }
      ]
    },
    {
      header: 'Transactions',
      links: [
        { icon: <FaChartLine />, label: 'Referral', path: '/user/referral' },
        { icon: <FaChartLine />, label: 'Deposit', path: '/user/deposit' },
        {
          icon: <FaChartLine />,
          label: 'Withdrawal',
          path: '/user/withdrawal'
        },
        { icon: <FaExchangeAlt />, label: 'Transfer', path: '/user/transfer' }
      ]
    },
    {
      header: 'Privacy',
      links: [
        { icon: <FaCreditCard />, label: 'Card', path: '/user/card' },
        { icon: <FaHistory />, label: 'History', path: '/user/history' },
        { icon: <FaIdBadge />, label: 'KYC', path: '/user/kyc' },
        { icon: <FaKey />, label: 'Password', path: '/user/password' },
        {
          icon: <FaSignOutAlt />,
          label: 'Logout',
          path: '/logout',
          action: 'logout'
        }
      ]
    }
  ]

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 600
      setIsMobile(mobile)
      if (!mobile) setDrawerOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Connect wallet (MetaMask, WalletConnect, etc)
  const connectWallet = async () => {
    setWeb3Error(null)
    try {
      const instance = await web3Modal.connect()
      const ethersProvider = new ethers.BrowserProvider(instance)
      setProvider(ethersProvider)
      const signer = await ethersProvider.getSigner()
      setSigner(signer)
      const address = await signer.getAddress()
      setWalletAddress(address)
      const network = await ethersProvider.getNetwork()
      setChainId(Number(network.chainId))
      return { ethersProvider, signer, address, network }
    } catch (e) {
      setWeb3Error('Could not connect wallet.')
    }
  }

  // Fetch balances after connection or when modal opens
  useEffect(() => {
    async function fetchBalances () {
      setBalances([])
      setWalletAddress(null)
      setWeb3Error(null)
      if (!modalOpen) return
      let _provider = provider
      let _signer = signer
      let _address = walletAddress
      let _chainId = chainId
      if (!provider || !signer || !walletAddress) {
        const result = await connectWallet()
        if (!result) return
        _provider = result.ethersProvider
        _signer = result.signer
        _address = result.address
        _chainId = Number(result.network.chainId)
      }
      setProvider(_provider)
      setSigner(_signer)
      setWalletAddress(_address)
      setChainId(_chainId)
      const chain = CHAINS.find(c => c.id === Number(_chainId))
      if (!chain) {
        setWeb3Error('Unsupported network.')
        return
      }
      // Native balance
      const nativeBalance = await _provider.getBalance(_address)
      const balancesArr = [
        {
          name: chain.native.symbol,
          balance: ethers.formatUnits(nativeBalance, chain.native.decimals),
          isNative: true,
          address: null,
          decimals: chain.native.decimals
        }
      ]
      // Tokens
      for (let token of chain.tokens) {
        if (!token.address) continue
        const contract = new ethers.Contract(
          token.address,
          ERC20_ABI,
          _provider
        )
        let balance = await contract.balanceOf(_address)
        let decimals = token.decimals
        try {
          decimals = await contract.decimals()
        } catch {}
        balancesArr.push({
          name: token.name,
          balance: ethers.formatUnits(balance, decimals),
          isNative: false,
          address: token.address,
          decimals
        })
      }
      setBalances(balancesArr)
    }
    fetchBalances()
    // eslint-disable-next-line
  }, [modalOpen, chainId])

  // Send transaction
  const handleSend = async e => {
    e.preventDefault()
    setWeb3Error(null)
    setTxHash(null)
    setIsLoading(true)
    try {
      if (!provider || !signer) {
        setWeb3Error('Wallet not connected.')
        setIsLoading(false)
        return
      }
      // const chain = CHAINS.find(c => c.id === Number(chainId))
      const token = balances[selectedTokenIdx]
      if (!ethers.isAddress(recipient)) {
        setWeb3Error('Recipient address is invalid.')
        setIsLoading(false)
        return
      }
      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        setWeb3Error('Amount must be greater than zero.')
        setIsLoading(false)
        return
      }
      if (Number(amount) > Number(token.balance)) {
        setWeb3Error('Insufficient balance.')
        setIsLoading(false)
        return
      }
      let tx
      if (token.isNative) {
        tx = await signer.sendTransaction({
          to: recipient,
          value: ethers.parseUnits(amount, token.decimals)
        })
      } else {
        const contract = new ethers.Contract(token.address, ERC20_ABI, signer)
        let decimals = token.decimals
        try {
          decimals = await contract.decimals()
        } catch {}
        tx = await contract.transfer(
          recipient,
          ethers.parseUnits(amount, decimals)
        )
      }
      setTxHash(tx.hash)
      setModalOpen(false)
      setRecipient('')
      setAmount('')
    } catch (err) {
      if (err.code === 4001) {
        setWeb3Error('Transaction rejected by user.')
      } else {
        setWeb3Error(err.message || 'Transaction failed')
      }
    }
    setIsLoading(false)
  }

  const handleLogout = e => {
    e.preventDefault()
    localStorage.removeItem('token')
    setDrawerOpen(false)
    navigate('/')
  }

  const chain = CHAINS.find(c => c.id === Number(chainId))
  const explorerBase = chain?.explorer || 'https://etherscan.io/tx/'

  return (
    <div>
      <header className='dashboard-header'>
        <div className='logo-section'>
          <img
            src='https://i.postimg.cc/NjS69Ysh/thunder-Xtorm-logo.png'
            alt='company logo'
            className='brand-name'
            style={{ height: 36, width: 'auto', marginRight: 12 }}
          />
        </div>
        <div className='header-actions'>
          <button
            className='icon-btn'
            aria-label='Expand'
            onClick={() => setModalOpen(true)}
            disabled={isLoading}
            style={isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
          >
            <FaExpand />
          </button>
          <button
            className='icon-btn'
            aria-label='Menu'
            onClick={() => setDrawerOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Modal for sending tokens */}
      {modalOpen && (
        <div
          className='modal-overlay'
          style={{
            zIndex: 10000,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)'
          }}
        >
          <div
            className='modal-content'
            style={{
              background: '#fff',
              maxWidth: 420,
              margin: '10vh auto',
              padding: 26,
              borderRadius: 14,
              position: 'relative',
              boxShadow: '0 2px 20px rgba(0,0,0,0.15)'
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                background: 'none',
                border: 'none',
                fontSize: 18
              }}
            >
              ×
            </button>
            <h2 style={{ marginBottom: 6 }}>Send Tokens</h2>
            {!walletAddress && (
              <button
                type='button'
                onClick={connectWallet}
                style={{ marginBottom: 10 }}
              >
                Connect Wallet
              </button>
            )}
            {walletAddress && (
              <div style={{ color: '#333', marginBottom: 10, fontSize: 13 }}>
                Connected: {walletAddress}
              </div>
            )}
            <form onSubmit={handleSend}>
              <label>
                Network
                <select
                  value={chainId}
                  onChange={e => {
                    setChainId(Number(e.target.value))
                    setSelectedTokenIdx(0)
                  }}
                >
                  {CHAINS.map(chain => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Token
                <select
                  value={selectedTokenIdx}
                  onChange={e => setSelectedTokenIdx(Number(e.target.value))}
                >
                  {balances.length > 0
                    ? balances.map((tok, idx) => (
                        <option key={tok.name} value={idx}>
                          {tok.name} (Bal:{' '}
                          {Number(tok.balance).toLocaleString(undefined, {
                            maximumFractionDigits: 6
                          })}
                          )
                        </option>
                      ))
                    : chain.tokens.map((tok, idx) => (
                        <option key={tok.name} value={idx}>
                          {tok.name}
                        </option>
                      ))}
                </select>
              </label>
              <label>
                Recipient
                <input
                  type='text'
                  required
                  value={recipient}
                  placeholder='0x...'
                  onChange={e => setRecipient(e.target.value)}
                  autoComplete='off'
                />
              </label>
              <label>
                Amount
                <input
                  type='number'
                  required
                  min='0'
                  step='any'
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  autoComplete='off'
                />
              </label>
              <button
                type='submit'
                disabled={isLoading || !walletAddress}
                style={{ marginTop: 12, width: '100%' }}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
            {web3Error && (
              <div style={{ color: 'red', marginTop: 12 }}>{web3Error}</div>
            )}
            {balances.length > 0 && (
              <div style={{ marginTop: 12, fontSize: 12 }}>
                <b>Your Balances:</b>
                <ul>
                  {balances.map((tok, i) => (
                    <li key={tok.name}>
                      {tok.name}:{' '}
                      {Number(tok.balance).toLocaleString(undefined, {
                        maximumFractionDigits: 6
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Show transaction status */}
      {txHash && (
        <div style={{ color: 'blue', marginLeft: 20 }}>
          Transaction sent:{' '}
          <a
            href={`${explorerBase}${txHash}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {txHash}
          </a>
        </div>
      )}

      {drawerOpen && (
        <div className='drawer-overlay' onClick={() => setDrawerOpen(false)} />
      )}

      <nav
        className={`drawer${drawerOpen ? ' open' : ''}${
          isMobile ? ' mobile' : ''
        }`}
      >
        <button
          className='drawer-close-btn'
          onClick={() => setDrawerOpen(false)}
        >
          <FaTimes />
        </button>
        <ul className='drawer-list'>
          {sidebarSections.map((section, i) => (
            <React.Fragment key={i}>
              {section.header && (
                <li className='drawer-category-header'>{section.header}</li>
              )}
              {section.links.map((link, idx) => (
                <li key={link.path + idx} onClick={() => setDrawerOpen(false)}>
                  {link.action === 'logout' ? (
                    <a
                      href='/'
                      className='drawer-link'
                      onClick={handleLogout}
                      style={{
                        color:
                          location.pathname === link.path
                            ? '#61CE70'
                            : undefined
                      }}
                    >
                      <span className='drawer-icon'>{link.icon}</span>
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className='drawer-link'
                      style={{
                        color:
                          location.pathname === link.path
                            ? '#61CE70'
                            : undefined
                      }}
                    >
                      <span className='drawer-icon'>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  )
}
