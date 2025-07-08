import {
  FaUserEdit,
  FaPiggyBank,
  FaShareAlt,
  FaPalette,
  FaKey,
  FaLock
} from 'react-icons/fa'
import Image from 'next/image'
import MainHeader from '../../Components/User/MainHeader'

const settings = [
  {
    icon: <FaUserEdit />,
    title: 'Edit Profile',
    desc: 'Make changes to your account'
  },
  {
    icon: <FaPiggyBank />,
    title: 'Bank Details',
    desc: 'Money are sent to your bank'
  },
  {
    icon: <FaShareAlt />,
    title: 'Refer a friend',
    desc: 'Earn money for referring friends'
  },
  {
    icon: <FaPalette />,
    title: 'Change Accent',
    desc: 'Change the overall app color'
  },
  {
    icon: <FaKey />,
    title: 'Change PIN',
    desc: 'Money are sent to your bank'
  },
  {
    icon: <FaLock />,
    title: 'Change Password',
    desc: 'Money are sent to your bank'
  }
]

export default function ProfilePage () {
  return (
    <>
      <MainHeader />
      <div className='profile-settings'>
        <div className='profile-header'>
          <Image
            src='https://i.postimg.cc/NjS69Ysh/thunder-Xtorm-logo.png'
            alt='User Avatar'
            width={60}
            height={60}
            className='avatar'
          />
          <div className='user-info'>
            <h2>Jammie Brown</h2>
            <p>ID: 23943</p>
          </div>
        </div>

        <div className='settings-list'>
          {settings.map((item, index) => (
            <div key={index} className='settings-item'>
              <div className='icon'>{item.icon}</div>
              <div className='details'>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              <span className='arrow'>&gt;</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
