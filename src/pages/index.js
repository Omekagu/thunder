import Login from './adminroutes/Login'
import ManageRole from './adminroutes/ManageRole'
import ManageHotels from './adminroutes/ManageHotels'
import Schedule from './adminroutes/Schedule'
import Tickets from './adminroutes/Tickets'
import ManageReferral from './adminroutes/ManageReferral'
import Payments from './adminroutes/Payments'
import Deposit from './adminroutes/Deposit'
import Withdrawal from './adminroutes/Withdrawal'
import GatewaySettings from './adminroutes/GatewaySettings'
import EmailManager from './adminroutes/EmailManager'
import GeneralSettings from './adminroutes/GeneralSettings'
import ManageLanguage from './adminroutes/ManageLanguage'
import ManageTheme from './adminroutes/ManageTheme'
import CommissionLog from './adminroutes/CommissionLog'
import ManageMobile from './adminroutes/ManageMobile'
import Newsletter from './adminroutes/Newsletter'
import Report from './adminroutes/Report'
import UpdateSystem from './adminroutes/UpdateSystem'
import ManagerUsers from './adminroutes/ManageUsers'
import PrivateRoute from './adminroutes/PrivateRoute'
import Reservations from './adminroutes/Reservations'
import ManageRooms from './adminroutes/ManageRooms'
import StaffSection from './adminroutes/StaffSection'
import Reports from './adminroutes/Reports'
import GuestReviews from './adminroutes/GuestReviews'
import ActiveUsers from './adminroutes/manage-users/ActiveUsers'
import Analytics from './adminroutes/dashboard/Analytics'
import DashBoard from './adminroutes/DashBoard'
import Bookings from './adminroutes//manage-users/Bookings'
import { UserDashboard } from './UserRoutes/tabs/UserDashboard'
import InvestmentPlan from './UserRoutes/tabs/InvestmentPlan'
import DepositPage from './UserRoutes/tabs/DepositPage'
import WithdrawalPage from './UserRoutes/tabs/WithdrawalPage'
import ReferralPage from './UserRoutes/tabs/ReferralPage'
import Profilepage from './UserRoutes/tabs/Profilepage'
import ActivePlanPage from './UserRoutes/tabs/ActivePlanPage'
import EarningsPage from './UserRoutes/tabs/EarningsPage'
import LoansPage from './UserRoutes/tabs/LoansPage'
import ApplyLoanPage from './UserRoutes/tabs/ApplyLoanPage'
import LoanHistory from './UserRoutes/tabs/LoanHistory'
import TransferPage from './UserRoutes/tabs/TransferPage'
import CardPage from './UserRoutes/tabs/CardPage'
import HistoryPage from './UserRoutes/tabs/HistoryPage'
import KycPage from './UserRoutes/tabs/KycPage'
import PasswordPage from './UserRoutes/tabs/PasswordPage'

export default function Home () {
  return (
    <div>
      <Login />
      <UserDashboard />
      <Schedule />
      <Tickets />
      <ManageReferral />
      <Payments />
      <Deposit />
      <Withdrawal />
      <GatewaySettings />
      <EmailManager />
      <GeneralSettings />
      <ManageLanguage />
      <ManageTheme />
      <CommissionLog />
      <ManageMobile />
      <Newsletter />
      <Report />
      <UpdateSystem />
      <ManagerUsers />
      <PrivateRoute />
      <Reservations />
      <ManageRooms />
      <StaffSection />
      <Reports />
      <GuestReviews />
      <ActiveUsers />
      <Analytics />
      <DashBoard />
      <Bookings />
      <InvestmentPlan />
      <DepositPage />
      <WithdrawalPage />
      <ReferralPage />
      <Profilepage />
      <ActivePlanPage />
      <EarningsPage />
      <LoansPage />
      <ApplyLoanPage />
      <LoanHistory />
      <TransferPage />
      <CardPage />
      <HistoryPage />
      <KycPage />
      <PasswordPage />
    </div>
  )
}
