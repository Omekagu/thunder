'use client'

import { useEffect, useState } from 'react'
import {
  Snackbar,
  Alert,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'
import AdminHeader from '../../Components/Admin/AdminHeader'

export default function PopUpPage () {
  const [open, setOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const [submittedMessage, setSubmittedMessage] = useState(null)

  const handleSend = () => {
    if (customMessage.trim()) {
      setSubmittedMessage(customMessage)
      setOpen(true)
      setCustomMessage('')
    }
  }

  useEffect(() => {
    if (submittedMessage) {
      const timer = setTimeout(() => setOpen(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [submittedMessage])

  return (
    <div>
      <AdminHeader />
      <Box className='buyStatusPage'>
        <Typography variant='h6' fontWeight={600} mb={2}>
          Send User Notification
        </Typography>
        <Box display='flex' gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
          <TextField
            label='Notification Message'
            variant='outlined'
            value={customMessage}
            onChange={e => setCustomMessage(e.target.value)}
            fullWidth
          />
          <Button variant='contained' onClick={handleSend}>
            Send
          </Button>
        </Box>

        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={40000}
        >
          <Alert severity='success' variant='outlined'>
            {submittedMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  )
}
