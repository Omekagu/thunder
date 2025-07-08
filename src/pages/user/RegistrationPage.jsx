import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../../Components/Layouts/Input'
import Image from 'next/image'

// Example country list — expand or use country-list npm module for full set
const countries = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' }
]

export default function RegistrationPage () {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async e => {
    e.preventDefault()
    const { name, email, password, confirmPassword, country, state, city } =
      form

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !country ||
      !state ||
      !city
    ) {
      toast.error('All fields are required')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await axios.post(
        'https://bonserver-production.up.railway.app/admin/register',
        { name, email, password, country, state, city }
      )

      toast.success('Registration successful. Please login.', {
        position: 'top-right'
      })
      router.push('/auth/login')
    } catch (err) {
      console.error('Registration error:', err)
      toast.error(
        err.response?.data?.error || 'Something went wrong. Try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login'>
      <ToastContainer />
      <div className='login__container'>
        {/* <Image
          src='https://i.postimg.cc/NjS69Ysh/thunder-Xtorm-logo.png'
          alt='logo'
          className='login__img'
          width={50}
          height={50}
        /> */}
        <h3 className='login__head'>Create Account</h3>

        <form onSubmit={handleRegister} className='login__form'>
          <Input
            placeholder='Full Name'
            name='name'
            value={form.name}
            onChange={handleChange}
          />
          <Input
            placeholder='Email Address'
            name='email'
            value={form.email}
            onChange={handleChange}
          />
          <Input
            placeholder='Password'
            name='password'
            type='password'
            value={form.password}
            onChange={handleChange}
          />
          <Input
            placeholder='Confirm Password'
            name='confirmPassword'
            type='password'
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <select
            name='country'
            value={form.country}
            onChange={handleChange}
            className='custom-select'
          >
            <option value=''>Select Country</option>
            {countries.map(c => (
              <option key={c.code} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>

          <Input
            placeholder='State/Province'
            name='state'
            value={form.state}
            onChange={handleChange}
          />

          <Input
            placeholder='City'
            name='city'
            value={form.city}
            onChange={handleChange}
          />

          <button
            type='submit'
            disabled={loading}
            className='custom-login-button'
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <p className='register__login-text'>
            Already have an account?{' '}
            <span
              onClick={() => router.push('/')}
              style={{ color: '#4a90e2', cursor: 'pointer' }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
