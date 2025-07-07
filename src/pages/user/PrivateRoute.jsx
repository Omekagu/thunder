import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PrivateRoute = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/user/Login')
      } else {
        setAuthorized(true)
      }
      setLoading(false)
    }
  }, [router])

  if (loading) return <div>Loading...</div>
  if (!authorized) return null

  return children
}

export default PrivateRoute
