import { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { BsMoonFill, BsQuestionCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useContextHook } from '../context/context';

function Header() {
  const navigate = useNavigate();
  const { nightMode, setNightMode } = useContextHook();
  const [MenuActive, setMenuActive] = useState(false);
  return (
    <div className='w-full fixed top-0 z-10'>
      <div
        className={` h-13 relative w-full ${
          nightMode ? 'bg-white' : 'bg-corPrincipal'
        } flex justify-between p-2 items-center z-20 `}
      >
        <div
          className={`ml-6 text-center ${
            nightMode ? 'text-corPrincipal' : 'text-white'
          } text-[30px] font-bold font-['League Spartan'] cursor-pointer`}
          onClick={() => {
            navigate('/');
          }}
        >
          FilmAÍ
        </div>
        <div
          className={`text-center  ${
            nightMode ? 'text-corPrincipal' : 'text-white'
          } text-[30px] font-bold font-['League Spartan'] cursor-pointer mr-6`}
          onClick={() => {
            setMenuActive(!MenuActive);
          }}
        >
          <BiMenu />
        </div>
      </div>
      <div
        className={` fixed right-5 transition-all duration-300 ease-in-out z-10 ${
          MenuActive ? 'top-[61px]' : 'top-[-200px]'
        } h-[70px] w-[56px] bg-[#00000046] flex flex-col items-center gap-5 justify-center`}
      >
        <BsMoonFill
          className=' cursor-pointer'
          color='white'
          onClick={() => {
            setNightMode(!nightMode);
          }}
        />
      </div>
    </div>
  );
}

export default Header;
