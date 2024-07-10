import logo from '../../assets/images/logo.png';
import { HiHome, HiStar, HiPlus, HiDotsVertical } from "react-icons/hi";
import { HiMagnifyingGlass, HiTv, HiPlayCircle } from "react-icons/hi2";
import HeaderItem from '../home/HeaderItem';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false)
  const menu = [
    {
      name: 'HOME',
      icon: HiHome
    },
    {
      name: 'SEARCH',
      icon: HiMagnifyingGlass
    },
    {
      name: 'WATCH LIST',
      icon: HiPlus
    },
    {
      name: 'ORIGINALS',
      icon: HiStar
    },
    {
      name: 'MOVIE',
      icon: HiPlayCircle
    },
    {
      name: 'SERIES',
      icon: HiTv
    },
  ];

  axios.defaults.withCredentials = true
          const handleLogout = () => {
            axios.post('http://localhost:3001/auth/logout')
              .then(response => {
                console.log('Logout successful:', response.data);
                toast.success('Logged out successfully!');
                navigate('/'); // Redirect to login or homepage
              })
              .catch(error => {
                console.error('Logout failed:', error);
                toast.error('Logout failed. Please try again.');
              });
          };

  return (
    <div className="flex items-center  justify-between p-5 bg-[#1C1C1C]">
      <div className='flex gap-8 items-center'>
        <img src={logo} className='w-[80px] md:w-[115px] object-cover' alt="logo" />
        <div className='hidden md:flex gap-8'>
          {menu.map((item, index) =>
            (<HeaderItem key={index} name={""} Icon={item.icon} />)
          )}
        </div>
        <div className='flex md:hidden gap-8'>
          {menu.map((item, index) => index < 3 &&
            (<HeaderItem key={index} name={""} Icon={item.icon} />)
          )}
          <div className='md:hidden' onClick={()=>setToggle(!toggle)}>
            <HeaderItem name={''} Icon={HiDotsVertical} />
            {toggle ? <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-5 py-4'>
              {menu.map((item, index) => index >= 3 &&
                (<HeaderItem key={index} name={item.name} Icon={item.icon} />)
              )}
            </div> : null}
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <button onClick={handleLogout}  className='bg-red-500 text-black py-2 px-4 rounded-lg'>Logout</button>
        <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" className='w-[40px] rounded-full' />
      </div>
    </div>
  );
}

export default Header;
