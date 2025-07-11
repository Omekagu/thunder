// File: pages/admin/investment-loans.jsx
'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  Button,
  Switch,
  FormControlLabel
} from '@mui/material'
import AdminHeader from '../../Components/Admin/AdminHeader'

const mockLoans = [
  {
    id: 1,
    name: 'Starter Loan',
    category: 'Short Term',
    interestRate: 15,
    interestType: 'Fixed',
    minAmount: 1000,
    maxAmount: 5000,
    duration: 30,
    durationType: 'days',
    capitalBack: true,
    collateralRequired: false,
    repaymentFrequency: 'Weekly',
    approvalStatus: 'Approved',
    enabled: true
  },
  {
    id: 2,
    name: 'Growth Loan',
    category: 'Long Term',
    interestRate: 22,
    interestType: 'Variable',
    minAmount: 10000,
    maxAmount: 100000,
    duration: 6,
    durationType: 'months',
    capitalBack: false,
    collateralRequired: true,
    repaymentFrequency: 'Monthly',
    approvalStatus: 'Pending',
    enabled: false
  }
]

export default function LoanListPage () {
  const [loans, setLoans] = useState(mockLoans)

  const handleDelete = id => {
    setLoans(prev => prev.filter(loan => loan.id !== id))
  }

  const handleEdit = id => {
    alert('Edit Loan ID: ' + id)
  }

  const handleToggle = id => {
    setLoans(prev =>
      prev.map(loan =>
        loan.id === id ? { ...loan, enabled: !loan.enabled } : loan
      )
    )
  }

  return (
    <>
      <AdminHeader />
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          backgroundColor: '#f4f6f8',
          minHeight: '100vh'
        }}
      >
        <Typography
          variant='h6'
          fontWeight={700}
          textAlign='center'
          gutterBottom
        >
          Investment Loans Overview
        </Typography>

        <Typography
          variant='body1'
          textAlign='center'
          color='text.secondary'
          mb={4}
        >
          Review and manage all active loan investment plans
        </Typography>

        <Grid container spacing={4} justifyContent='center'>
          {loans.map(loan => (
            <Grid item xs={12} sm={6} md={4} key={loan.id}>
              <Card
                elevation={4}
                sx={{ borderRadius: 4, background: '#ffffff' }}
              >
                <CardContent>
                  <Stack spacing={1.2}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Typography variant='h6' fontWeight={600}>
                        {loan.name}
                      </Typography>
                      <Chip label={loan.category} color='info' size='small' />
                    </Stack>

                    <FormControlLabel
                      control={
                        <Switch
                          checked={loan.enabled}
                          onChange={() => handleToggle(loan.id)}
                          color='primary'
                        />
                      }
                      label={loan.enabled ? 'Enabled' : 'Disabled'}
                    />

                    <Divider />

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Interest:</strong> {loan.interestRate}% (
                      {loan.interestType})
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Loan Range:</strong> ₦
                      {loan.minAmount.toLocaleString()} - ₦
                      {loan.maxAmount.toLocaleString()}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Duration:</strong> {loan.duration}{' '}
                      {loan.durationType}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Capital Back:</strong>{' '}
                      {loan.capitalBack ? 'Yes' : 'No'}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Collateral Required:</strong>{' '}
                      {loan.collateralRequired ? 'Yes' : 'No'}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Repayment:</strong> {loan.repaymentFrequency}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Status:</strong> {loan.approvalStatus}
                    </Typography>

                    <Stack direction='row' spacing={2} mt={1}>
                      <Button
                        variant='outlined'
                        size='small'
                        color='primary'
                        onClick={() => handleEdit(loan.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        color='error'
                        onClick={() => handleDelete(loan.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
