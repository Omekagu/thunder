import UserAmount from '../../Components/User/UserAmount'
import InvestmentHistory from '../../Components/User/InvestmentHistory'
import MainHeader from '../../Components/User/MainHeader'
import PrivateRoute from './PrivateRoute'
import UserNotificationPopup from '../../Components/Admin/UserNotificationPopup'

export default function UserDashboard () {
  return (
    <PrivateRoute>
      <div className='dashboard-container'>
        <MainHeader />
        <UserNotificationPopup
          message='Welcome back!'
          type='success'
          openInitially={true}
        />
        {/* TOP CARD from Image 2 */}
        <UserAmount />

        {/* Investment History */}
        <InvestmentHistory />
      </div>
    </PrivateRoute>
  )
}
