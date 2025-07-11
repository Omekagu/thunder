import React, { useState, useEffect, useCallback } from 'react'
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaChartLine,
  FaSignOutAlt,
  FaMoneyCheckAlt,
  FaPiggyBank,
  FaCreditCard,
  FaHistory,
  FaIdBadge,
  FaKey,
  FaExchangeAlt
} from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function AdminHeader () {
  const [isMobile, setIsMobile] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const router = useRouter()

  // Sidebar structure with headers and sub-links
  const sidebarSections = [
    {
      header: null,
      links: [
        {
          icon: <FaHome />,
          label: 'Dashboard',
          path: '/admin/AdminDashboard'
        }
      ]
    },
    {
      header: 'User Management',
      links: [
        {
          icon: <FaHome />,
          label: 'Users',
          path: '/admin/Users'
        },
        { icon: <FaUser />, label: 'KYC control', path: '/admin/KycManagement' }
      ]
    },
    {
      header: 'Trade',
      links: [
        {
          icon: <FaPiggyBank />,
          label: 'Create Buy Coin',
          path: '/admin/CreateBuyCoinPage'
        },
        {
          icon: <FaPiggyBank />,
          label: 'Buyers',
          path: '/admin/BuyStatus'
        },
        {
          icon: <FaChartLine />,
          label: 'Create Sell Coin',
          path: '/admin/CreateSellCoinPage'
        },
        {
          icon: <FaChartLine />,
          label: 'Sellers',
          path: '/admin/SellStatus'
        },
        {
          icon: <FaChartLine />,
          label: 'Swap Coin',
          path: '/admin/SwappedCoinPage'
        }
      ]
    },
    {
      header: 'Investment Plans',
      links: [
        {
          icon: <FaPiggyBank />,
          label: 'Plans',
          path: '/admin/InvestmentPlanList'
        },
        {
          icon: <FaPiggyBank />,
          label: 'Create Plans',
          path: '/admin/CreateInvestmentPlan'
        }
      ]
    },
    {
      header: 'Loans',
      links: [
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Loans',
          path: '/admin/LoanListPage'
        },
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Create Loan',
          path: '/admin/CreateLoanPage'
        },
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Loans Status',
          path: '/admin/LoanStatusPage'
        }
      ]
    },
    {
      header: 'Transactions',
      links: [
        {
          icon: <FaChartLine />,
          label: 'Referrals',
          path: '/admin/UserReferredPage'
        },
        {
          icon: <FaChartLine />,
          label: 'Deposits',
          path: '/admin/DepositStatus'
        },
        {
          icon: <FaChartLine />,
          label: 'Withdrawals',
          path: '/admin/WithdrawalStatus'
        },
        {
          icon: <FaExchangeAlt />,
          label: 'Transfers',
          path: '/admin/TransferStatus'
        }
      ]
    },
    {
      header: 'Notifications',
      links: [
        {
          icon: <FaCreditCard />,
          label: 'Email Settings',
          path: '/admin/EmailSettingsPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Email Templates',
          path: '/admin/EmailTemplatesPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Send Email',
          path: '/admin/SendEmailPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Send SMS',
          path: '/admin/SendSMSPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Pop up',
          path: '/admin/PopUpPage'
        }
      ]
    },
    {
      header: 'Payment Gateway',
      links: [
        {
          icon: <FaCreditCard />,
          label: 'Cryptocurrency',
          path: '/admin/CryptoGatewayPage'
        },
        {
          icon: <FaHistory />,
          label: 'Transfers',
          path: '/admin/TransferGatewayPage'
        },
        {
          icon: <FaIdBadge />,
          label: 'Bank Card',
          path: '/admin/BankCardGatewayPage'
        }
      ]
    },
    {
      header: 'General App Settings',
      links: [
        { icon: <FaCreditCard />, label: 'Card', path: '/admin/UsersCardPage' },
        {
          icon: <FaCreditCard />,
          label: 'App Admin',
          path: '/admin/RoleManagement'
        },
        {
          icon: <FaHistory />,
          label: 'App History',
          path: '/admin/UsersHistoryPage'
        },
        { icon: <FaIdBadge />, label: 'KYC', path: '/admin/KycManagement' },
        { icon: <FaKey />, label: 'Password', path: '/admin/adminPasswordPage' }
      ]
    },
    {
      header: 'Account Settings',
      links: [
        {
          icon: <FaSignOutAlt />,
          label: 'Logout',
          path: '/logout',
          action: 'logout'
        }
      ]
    }
  ]

  // Responsive handler
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 600)
      const handleResize = () => {
        const mobile = window.innerWidth <= 600
        setIsMobile(mobile)
        if (!mobile) setDrawerOpen(false)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleLogout = e => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    setDrawerOpen(false)
    router.push('/')
  }

  return (
    <div>
      <header className='dashboard-header'>
        <div className='logo-section'>
          <img
            src='https://i.postimg.cc/PxxryJqc/thunder-Xtorm-logo-removebg-preview.png'
            alt='company logo'
            className='brand-name'
          />
        </div>
        <div className='header-actions'>
          <button
            className='icon-btn'
            aria-label='Menu'
            onClick={() => setDrawerOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </header>

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
                    <button
                      className='drawer-link'
                      onClick={handleLogout}
                      style={{
                        color:
                          router.pathname === link.path ? '#61CE70' : undefined,
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <span className='drawer-icon'>{link.icon}</span>
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <Link
                      href={link.path}
                      className='drawer-link'
                      style={{
                        color:
                          router.pathname === link.path ? '#61CE70' : undefined
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
