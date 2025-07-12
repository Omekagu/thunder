'use client'

import { useState } from 'react'
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  IconButton,
  Stack
} from '@mui/material'
import { ContentCopy, Delete } from '@mui/icons-material'
import AdminHeader from '../../Components/Admin/AdminHeader'

const walletTypes = ['BTC', 'ETH', 'BNB', 'USDT', 'LTC', 'XRP']

export default function WalletManager () {
  const [wallets, setWallets] = useState([])
  const [form, setForm] = useState({ type: 'BTC', address: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.address.trim()) return
    const newWallet = { ...form, id: Date.now() }
    setWallets(prev => [newWallet, ...prev])
    setForm({ type: 'BTC', address: '' })
  }

  const handleDelete = id => {
    setWallets(prev => prev.filter(w => w.id !== id))
  }

  const handleCopy = text => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <>
      <AdminHeader />
      <Box className='walletManager'>
        <Typography variant='h6' mb={2} fontWeight={600}>
          Wallet Address Manager
        </Typography>

        <Paper className='walletForm'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label='Wallet Type'
                name='type'
                value={form.type}
                onChange={handleChange}
                fullWidth
              >
                {walletTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label='Wallet Address'
                name='address'
                value={form.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box className='walletList'>
          {wallets.map(wallet => (
            <Paper key={wallet.id} className='walletCard'>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography>
                  <strong>{wallet.type}:</strong> {wallet.address}
                </Typography>
                <Stack direction='row' spacing={1}>
                  <IconButton
                    onClick={() => handleCopy(wallet.address)}
                    size='small'
                  >
                    <ContentCopy fontSize='small' />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(wallet.id)}
                    size='small'
                  >
                    <Delete fontSize='small' color='error' />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  )
}
