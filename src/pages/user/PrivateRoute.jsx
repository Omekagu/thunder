// components/PrivateRoute.jsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PrivateRoute = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Ensure we are in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/user/Login')
      } else {
        setAuthorized(true)
      }
    }
  }, [router])

  if (!authorized) return null // or a loading spinner

  return children
}

export default PrivateRoute
