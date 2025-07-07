import { useRouter } from 'next/router'

const PrivateRoute = () => {
  const router = useRouter()
  const token = localStorage.getItem('token')
  return token ? <Outlet /> : router.push('/login')
}

export default PrivateRoute
