'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Switch,
  Button,
  Box,
  Modal
} from '@mui/material'
import dayjs from 'dayjs'

const sampleKYCData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    submittedAt: '2025-07-10T12:34:00Z',
    status: 'pending',
    details: {
      documentType: 'Passport',
      documentImage: '/kyc/passport1.jpg',
      dob: '1990-01-01',
      address: '123 Lagos Street, NG'
    }
  },
  {
    id: 2,
    name: 'Amber Doe',
    email: 'amber@example.com',
    submittedAt: '2025-07-10T12:34:00Z',
    status: 'pending',
    details: {
      documentType: 'Passport',
      documentImage: '/kyc/passport1.jpg',
      dob: '1990-01-01',
      address: '123 Lagos Street, NG'
    }
  },
  {
    id: 3,
    name: 'Zoey Doe',
    email: 'zoey@example.com',
    submittedAt: '2025-07-10T12:34:00Z',
    status: 'pending',
    details: {
      documentType: 'Passport',
      documentImage: '/kyc/passport1.jpg',
      dob: '1990-01-01',
      address: '123 Lagos Street, NG'
    }
  },
  {
    id: 4,
    name: 'Max Doe',
    email: 'max@example.com',
    submittedAt: '2025-07-10T12:34:00Z',
    status: 'pending',
    details: {
      documentType: 'Passport',
      documentImage: '/kyc/passport1.jpg',
      dob: '1990-01-01',
      address: '123 Lagos Street, NG'
    }
  }
  // Add more users here...
]

export default function KYCDashboard () {
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState(sampleKYCData)

  const handleToggleStatus = id => {
    const updatedUsers = users.map(user =>
      user.id === id
        ? {
            ...user,
            status: user.status === 'approved' ? 'rejected' : 'approved'
          }
        : user
    )
    setUsers(updatedUsers)
  }

  const openDetails = user => setSelectedUser(user)
  const closeDetails = () => setSelectedUser(null)

  return (
    <Box className='kyc-dashboard'>
      <h5>Know Your Customer Management (KYC)</h5>
      <TableContainer component={Paper} className='tableContainer'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {dayjs(user.submittedAt).format('YYYY-MM-DD HH:mm')}
                </TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.status === 'approved'}
                    onChange={() => handleToggleStatus(user.id)}
                    color='primary'
                  />
                  <Button onClick={() => openDetails(user)} size='small'>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={!!selectedUser} onClose={closeDetails}>
        <Box className='modalContent'>
          {selectedUser && (
            <>
              <Typography variant='h6'>KYC Details</Typography>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {selectedUser.details.dob}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.details.address}
              </p>
              <p>
                <strong>Document:</strong> {selectedUser.details.documentType}
              </p>
              <img
                src={selectedUser.details.documentImage}
                alt='Document'
                className='documentImage'
              />
              <Button variant='contained' onClick={closeDetails}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  )
}
