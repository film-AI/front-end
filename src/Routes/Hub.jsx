import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useContextHook } from '../context/context';

function Hub() {
  const navigate = useNavigate();
  const { nightMode } = useContextHook();
  return (
    <div className=' h-[100vh] flex justify-center items-center gap-20'>
      <img className=' w-[300px] rounded-3xl' src='./src/img/logo.png' />
      <div className='flex flex-col justify-center items-center gap-[50px]'>
        <div>
          <h1
            className={`text-[50px] max-w-[800px] font-bold ${
              nightMode ? 'text-white' : 'text-black'
            } `}
          >
            Olá <br /> eu sou a FilmAí
          </h1>
          <p
            className={`text-[20px] ${
              nightMode ? 'text-white' : 'text-black'
            } `}
          >
            Irei te ajudar a escolher algo para assistir!
          </p>
        </div>
        <button
          className={`transition-all duration-300 ease-in-out text-[20px] border-[3px] rounded-[40px] border-corPrincipal p-2 w-[360px] hover:bg-corPrincipal hover:text-white ${
            nightMode ? 'text-white' : 'text-black'
          } `}
          onClick={() => {
            navigate('/Home');
          }}
        >
          Vamos lá
        </button>
      </div>
    </div>
  );
}

export default Hub;
