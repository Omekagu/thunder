import UserAmount from '../../Components/User/UserAmount'
import InvestmentHistory from '../../Components/User/InvestmentHistory'
import MainHeader from '../../Components/User/MainHeader'
import PrivateRoute from './PrivateRoute'

export default function UserDashboard () {
  return (
    <PrivateRoute>
      <div className='dashboard-container'>
        <MainHeader />

        {/* TOP CARD from Image 2 */}
        <UserAmount />

        {/* Investment History */}
        <InvestmentHistory />
      </div>
    </PrivateRoute>
  )
}
