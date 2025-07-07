import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../../Components/Input'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/user/UserDashboard') // Redirect to User Dashboard
    }
  }, [router])

  const handleLogin = async e => {
    e.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
    setLoading(true)

    try {
      const res = await axios.post(
        'https://bonserver-production.up.railway.app/admin/login',
        {
          email,
          password
        }
      )
      console.log('Login Success:', res.data)
      const token = res.data.token
      localStorage.setItem('token', token)
      toast.success('Login successful!', { position: 'top-right' })
      router.push('/user/UserDashboard') // Redirect to User Dashboard
    } catch (err) {
      console.error('Login Error:', err)

      if (err.response) {
        const { status, data } = err.response
        console.log('Error Data:', data)

        if (status === 400) {
          toast.error(data.error || 'Missing email or password')
        } else if (status === 404) {
          toast.error(data.error || 'Admin not found')
        } else if (status === 500) {
          toast.error('Server error. Please try again later.')
        } else {
          toast.error(data.error || 'An unexpected error occurred.')
        }
      } else {
        toast.error('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login'>
      <ToastContainer />
      <div className='login__container'>
        <img
          src='https://i.postimg.cc/NjS69Ysh/thunder-Xtorm-logo.png'
          alt='logo'
          className='login__img'
        />
        <h3 className='login__head'>Login</h3>

        <form onSubmit={handleLogin} className='login__form'>
          <Input
            placeholder='Email Address'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder='Password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p
            className='login__forgot-text'
            onClick={() => router.push('/forgot-password')}
          >
            Forgot password?
          </p>
          <button
            type='submit'
            disabled={loading}
            className='custom-login-button'
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
