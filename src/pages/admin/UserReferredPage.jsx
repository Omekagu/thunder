// File: pages/admin/user-referred.jsx
'use client'

import React, { useState } from 'react'
import AdminHeader from '../../Components/Admin/AdminHeader'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack
} from '@mui/material'

const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    referredBy: 'Bob Smith',
    deposit: 12000
  },
  {
    id: 2,
    name: 'David Brown',
    referredBy: 'Alice Johnson',
    deposit: 7000
  },
  {
    id: 3,
    name: 'Sarah Miller',
    referredBy: 'Bob Smith',
    deposit: 10000
  }
]

export default function UserReferredPage () {
  const [users] = useState(mockUsers)

  return (
    <>
      <AdminHeader />
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          background: '#fff',
          minHeight: '100vh',
          color: '#000'
        }}
      >
        <Typography variant='h6' fontWeight={700} mb={4} textAlign='center'>
          🧾 Referred Users Insight
        </Typography>

        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#fff' }}>
              <TableRow
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  backgroundColor: '#fff'
                }}
              >
                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>
                  User
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>
                  Referred By
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 600 }}>
                  Deposit Balance ($)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                      <Typography>{user.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{user.referredBy}</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 900,
                      color: '#236d3eff',
                      fontSize: '1rem'
                    }}
                  >
                    ${user.deposit.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  )
}
