// components/MuiUserTable.jsx
'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
  Tooltip,
  Button,
  Stack,
  Box,
  TablePagination
} from '@mui/material'
import { Edit, Delete, Block, VerifiedUser, Print } from '@mui/icons-material'

const initialUsers = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  surname: `#${i + 1}`,
  email: `user${i + 1}@example.com`,
  password: '••••••••',
  country: 'Country',
  verified: i % 3 === 0,
  banned: i % 7 === 0
}))

export default function UserTable () {
  const [users, setUsers] = useState(initialUsers)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const toggleVerify = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, verified: !user.verified } : user
      )
    )
  }

  const toggleBan = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, banned: !user.banned } : user
      )
    )
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const handlePrint = () => {
    window.print()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Paper elevation={3} sx={{ p: 2, minWidth: 1000 }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h6'>User Management</Typography>
          <Button
            variant='outlined'
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Print Users
          </Button>
        </Stack>
        <TableContainer>
          <Table stickyHeader aria-label='user table'>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: user.banned ? '#ffebee' : 'inherit'
                    }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.surname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>
                      {user.banned
                        ? 'Banned'
                        : user.verified
                        ? 'Verified'
                        : 'Unverified'}
                    </TableCell>
                    <TableCell>
                      <Tooltip title='Verify / Unverify'>
                        <IconButton onClick={() => toggleVerify(user.id)}>
                          <VerifiedUser
                            color={user.verified ? 'success' : 'disabled'}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Ban / Unban'>
                        <IconButton onClick={() => toggleBan(user.id)}>
                          <Block color={user.banned ? 'error' : 'disabled'} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Edit'>
                        <IconButton onClick={() => alert('Edit user')}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Delete'>
                        <IconButton onClick={() => deleteUser(user.id)}>
                          <Delete color='error' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
