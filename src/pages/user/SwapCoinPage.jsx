'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button
} from '@mui/material'
import MainHeader from '../../Components/User/MainHeader'

const coins = [
  { symbol: 'ETH', name: 'Ethereum', balance: 5, rate: 3000 },
  { symbol: 'BNB', name: 'Binance Coin', balance: 10, rate: 200 },
  { symbol: 'USDT', name: 'Tether', balance: 15, rate: 1 },
  { symbol: 'BTC', name: 'Bitcoin', balance: 2, rate: 60000 }
]

export default function SwapCoinPage () {
  const [fromCoin, setFromCoin] = useState('ETH')
  const [toCoin, setToCoin] = useState('USDT')
  const [amount, setAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState(0)

  useEffect(() => {
    const from = coins.find(c => c.symbol === fromCoin)
    const to = coins.find(c => c.symbol === toCoin)

    if (from && to && amount && from.symbol !== to.symbol) {
      const usdValue = parseFloat(amount) * from.rate
      const targetAmount = usdValue / to.rate
      setReceiveAmount(targetAmount)
    } else {
      setReceiveAmount(0)
    }
  }, [amount, fromCoin, toCoin])

  const handleSwap = () => {
    alert(
      `Swapped ${amount} ${fromCoin} to ${receiveAmount.toFixed(4)} ${toCoin}`
    )
  }

  return (
    <>
      <MainHeader />
      <Box className='page'>
        <Paper className='swapBox'>
          <Typography variant='h6' gutterBottom>
            Coin Swap
          </Typography>

          <TextField
            select
            label='From'
            value={fromCoin}
            onChange={e => setFromCoin(e.target.value)}
            fullWidth
            className='selectInput'
          >
            {coins.map(coin => (
              <MenuItem key={coin.symbol} value={coin.symbol}>
                {coin.name} ({coin.symbol}) - Balance: {coin.balance}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label='To'
            value={toCoin}
            onChange={e => setToCoin(e.target.value)}
            fullWidth
            className='selectInput'
          >
            {coins.map(coin => (
              <MenuItem key={coin.symbol} value={coin.symbol}>
                {coin.name} ({coin.symbol}) - Rate: ${coin.rate}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label='Amount'
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            fullWidth
            className='amountInput'
          />

          <Typography variant='body2' style={{ marginTop: '0.5rem' }}>
            Your {fromCoin} balance:{' '}
            {coins.find(c => c.symbol === fromCoin)?.balance}
          </Typography>

          <Typography variant='body2' style={{ marginTop: '0.5rem' }}>
            You will receive:{' '}
            <strong>
              {receiveAmount.toFixed(4)} {toCoin}
            </strong>
          </Typography>

          <Button
            variant='contained'
            color='primary'
            fullWidth
            className='swapButton'
            onClick={handleSwap}
            disabled={!amount || fromCoin === toCoin}
          >
            Swap coin
          </Button>
        </Paper>
      </Box>
    </>
  )
}
