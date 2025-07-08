import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../../Components/Layouts/Input'
import Image from 'next/image'

const countries = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dial: '+234' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', dial: '+233' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', dial: '+254' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dial: '+27' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44' }
]

export default function RegistrationPage () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    dialCode: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleCountryChange = e => {
    const selected = countries.find(c => c.name === e.target.value)
    setForm(prev => ({
      ...prev,
      country: selected.name,
      dialCode: selected.dial
    }))
  }

  const handleRegister = async e => {
    e.preventDefault()
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      country,
      state,
      city
    } = form

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !country ||
      !state ||
      !city
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await axios.post(
        'https://bonserver-production.up.railway.app/admin/register',
        form
      )
      toast.success('Registration successful! Please login.')
      router.push('/auth/login')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login'>
      <ToastContainer />
      <div className='login__container'>
        <h3 className='login__head'>Create a Secure Account</h3>

        <form onSubmit={handleRegister} className='login__form'>
          <div className='form-group-row'>
            <Input
              placeholder='First Name'
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
            />
            <Input
              placeholder='Middle Name'
              name='middleName'
              value={form.middleName}
              onChange={handleChange}
            />
            <Input
              placeholder='Last Name'
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <Input
            placeholder='Email Address'
            name='email'
            value={form.email}
            onChange={handleChange}
          />

          <div className='form-group-row'>
            <select
              name='country'
              value={form.country}
              onChange={handleCountryChange}
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
              placeholder='Phone Number'
              name='phone'
              type='tel'
              value={form.phone}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  phone: e.target.value.replace(/[^0-9]/g, '')
                }))
              }
            />
          </div>

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

          <div className='form-group-row'>
            <div className='gender-toggle'>
              <button
                type='button'
                className={form.gender === 'male' ? 'active' : ''}
                onClick={() => setForm({ ...form, gender: 'male' })}
              >
                Male
              </button>
              <button
                type='button'
                className={form.gender === 'female' ? 'active' : ''}
                onClick={() => setForm({ ...form, gender: 'female' })}
              >
                Female
              </button>
              <button
                type='button'
                className={form.gender === 'other' ? 'active' : ''}
                onClick={() => setForm({ ...form, gender: 'other' })}
              >
                Other
              </button>
            </div>
            <Input
              type='date'
              name='dob'
              value={form.dob}
              onChange={handleChange}
            />
          </div>

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
