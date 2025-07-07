const dummyHistory = [
  {
    id: '1',
    type: 'Deposit',
    amount: 500.0,
    date: '2025-06-25T14:24:00Z',
    status: 'Completed',
    description: 'BTC Deposit '
  },
  {
    id: '2',
    type: 'Withdraw',
    amount: 120.0,
    date: '2025-06-22T10:10:00Z',
    status: 'Completed',
    description: 'Investment from profit'
  },
  {
    id: '3',
    type: 'Interest',
    amount: 15.5,
    date: '2025-06-20T09:00:00Z',
    status: 'Completed',
    description: 'Regsitration'
  },
  {
    id: '4',
    type: 'Deposit',
    amount: 200.0,
    date: '2025-06-18T13:00:00Z',
    status: 'Pending',
    description: 'Login Bonus'
  },
  {
    id: '5',
    type: 'Dividend',
    amount: 35.0,
    date: '2025-06-15T19:30:00Z',
    status: 'Completed',
    description: 'ETH Deposit'
  },
  {
    id: '6',
    type: 'Withdraw',
    amount: 60.0,
    date: '2025-06-10T08:20:00Z',
    status: 'Failed',
    description: 'BTC Deposit error'
  },
  {
    id: '9',
    type: 'Withdraw',
    amount: 60.0,
    date: '2025-06-10T08:20:00Z',
    status: 'Failed',
    description: 'Transfer to JOE BIDEN'
  }
]

const typeToIcon = {
  Deposit: '⬆️',
  Withdraw: '⬇️',
  Interest: '💰',
  Dividend: '🏦'
}

const typeToColor = {
  Deposit: '#47fd65',
  Withdraw: '#ff637d',
  Interest: '#61CE70',
  Dividend: '#ffd700'
}

export default function InvestmentHistory = () => (
  <section className='investment-history'>
    <div className='history-header'>Transaction History</div>
    <div className='history-list'>
      {dummyHistory.map(item => (
        <div className='history-item' key={item.id}>
          <div
            className='history-icon'
            style={{ background: typeToColor[item.type] }}
          >
            {typeToIcon[item.type]}
          </div>
          <div className='history-details'>
            <div className='history-row'>
              <span className='history-type'>{item.type}</span>
              <span
                className={`history-amount ${
                  item.type === 'Deposit' ||
                  item.type === 'Interest' ||
                  item.type === 'Dividend'
                    ? 'positive'
                    : 'negative'
                }`}
              >
                {item.type === 'Withdraw' ? '-' : '+'}${item.amount.toFixed(2)}
              </span>
            </div>
            <div className='history-row'>
              <span className='history-date'>
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <span
                className={`history-status ${item.status.toLowerCase()}`}
                title={item.status}
              >
                {item.status}
              </span>
            </div>
            {item.description && (
              <div className='history-desc'>{item.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default InvestmentHistory
