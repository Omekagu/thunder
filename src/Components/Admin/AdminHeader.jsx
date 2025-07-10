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
          path: '/admin/UserDashboard'
        },
        { icon: <FaUser />, label: 'Manage Users', path: '/admin/Profilepage' },
        { icon: <FaUser />, label: 'KYC control', path: '/admin/Profilepage' }
      ]
    },
    {
      header: 'Trade',
      links: [
        {
          icon: <FaPiggyBank />,
          label: 'Create Buy Coin',
          path: '/admin/BuyCoinPage'
        },
        {
          icon: <FaPiggyBank />,
          label: 'Buyers',
          path: '/admin/BuyCoinPage'
        },
        {
          icon: <FaChartLine />,
          label: 'Create Sell Coin',
          path: '/admin/SellCoinPage'
        },
        {
          icon: <FaChartLine />,
          label: 'Sellers',
          path: '/admin/SellCoinPage'
        },
        {
          icon: <FaChartLine />,
          label: 'Create Swap Coin',
          path: '/admin/SwapCoinPage'
        }
      ]
    },
    {
      header: 'Investment Plans',
      links: [
        {
          icon: <FaPiggyBank />,
          label: 'Plans',
          path: '/admin/InvestmentPlan'
        },
        {
          icon: <FaPiggyBank />,
          label: 'Create Plans',
          path: '/admin/InvestmentPlan'
        },
        {
          icon: <FaChartLine />,
          label: 'Active Investment',
          path: '/admin/ActivePlanPage'
        }
      ]
    },
    {
      header: 'Loans',
      links: [
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Loan',
          path: '/admin/LoansPage'
        },
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Create Loan',
          path: '/admin/ApplyLoanPage'
        },
        {
          icon: <FaMoneyCheckAlt />,
          label: 'Active Loans',
          path: '/admin/LoanHistoryPage'
        }
      ]
    },
    {
      header: 'Transactions',
      links: [
        {
          icon: <FaChartLine />,
          label: 'Referrals',
          path: '/admin/ReferralPage'
        },
        { icon: <FaChartLine />, label: 'Deposit', path: '/admin/DepositPage' },
        {
          icon: <FaChartLine />,
          label: 'Withdrawal',
          path: '/admin/WithdrawalPage'
        },
        {
          icon: <FaExchangeAlt />,
          label: 'Transfer',
          path: '/admin/TransferPage'
        }
      ]
    },
    {
      header: 'Privacy',
      links: [
        { icon: <FaCreditCard />, label: 'Card', path: '/admin/CardPage' },
        { icon: <FaHistory />, label: 'History', path: '/admin/HistoryPage' },
        { icon: <FaIdBadge />, label: 'KYC', path: '/admin/KycPage' },
        { icon: <FaKey />, label: 'Password', path: '/admin/PasswordPage' },
        {
          icon: <FaSignOutAlt />,
          label: 'Logout',
          path: '/logout',
          action: 'logout'
        }
      ]
    },
    {
      header: 'Notifications',
      links: [
        {
          icon: <FaCreditCard />,
          label: 'Email Settings',
          path: '/admin/CardPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Email Templates',
          path: '/admin/CardPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Send Email',
          path: '/admin/CardPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Send SMS',
          path: '/admin/CardPage'
        },
        {
          icon: <FaCreditCard />,
          label: 'Send Pop up Notification',
          path: '/admin/CardPage'
        }
      ]
    },
    {
      header: 'General App Settings',
      links: [
        { icon: <FaCreditCard />, label: 'Card', path: '/admin/CardPage' },
        { icon: <FaHistory />, label: 'History', path: '/admin/HistoryPage' },
        { icon: <FaIdBadge />, label: 'KYC', path: '/admin/KycPage' },
        { icon: <FaKey />, label: 'Password', path: '/admin/PasswordPage' },
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
            src='https://i.postimg.cc/NjS69Ysh/thunder-Xtorm-logo.png'
            alt='company logo'
            className='brand-name'
            style={{ height: 36, width: 'auto', marginRight: 12 }}
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
