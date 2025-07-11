// File: pages/admin/investment-plans.jsx
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
  Button
} from '@mui/material'
import AdminHeader from '../../Components/Admin/AdminHeader'

const mockPlans = [
  {
    id: 1,
    name: 'Starter Plan',
    category: 'Short Term',
    profit: 15,
    minAmount: 1000,
    maxAmount: 5000,
    duration: 30,
    durationType: 'days',
    capitalBack: true
  },
  {
    id: 2,
    name: 'Growth Plan',
    category: 'Long Term',
    profit: 50,
    minAmount: 10000,
    maxAmount: 100000,
    duration: 3,
    durationType: 'months',
    capitalBack: false
  }
]

export default function InvestmentPlanList () {
  const [plans, setPlans] = useState(mockPlans)

  const handleDelete = id => {
    setPlans(prev => prev.filter(plan => plan.id !== id))
  }

  const handleEdit = id => {
    alert('Edit Plan ID: ' + id)
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
          variant='h5'
          fontWeight={700}
          textAlign='center'
          gutterBottom
        >
          Investment Plans Overview
        </Typography>

        <Typography
          variant='body1'
          textAlign='center'
          color='text.secondary'
          mb={4}
        >
          Review and manage all active investment plans
        </Typography>

        <Grid container spacing={4} justifyContent='center'>
          {plans.map(plan => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
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
                        {plan.name}
                      </Typography>
                      <Chip label={plan.category} color='info' size='small' />
                    </Stack>

                    <Divider />

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Profit:</strong> {plan.profit}%
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Investment Range:</strong> ₦
                      {plan.minAmount.toLocaleString()} - ₦
                      {plan.maxAmount.toLocaleString()}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Duration:</strong> {plan.duration}{' '}
                      {plan.durationType}
                    </Typography>

                    <Typography variant='body2' color='text.secondary'>
                      <strong>Capital Back:</strong>{' '}
                      {plan.capitalBack ? 'Yes' : 'No'}
                    </Typography>

                    <Stack direction='row' spacing={2} mt={1}>
                      <Button
                        variant='outlined'
                        size='small'
                        color='primary'
                        onClick={() => handleEdit(plan.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        color='error'
                        onClick={() => handleDelete(plan.id)}
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
