import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
function LoadResponseFilmai() {
  return (
    <div className='flex max-w-[700px] w-full gap-3'>
      <img className=' h-[50px]  rounded-[18px]' src='./src/img/logo.png' />
      <p className="w-[450px] rounded-lg p-3pb-[150px]  text-black text-[15px] font-light font-['League Spartan'] text-left flex items-center">
        <ThreeDots
          visible={true}
          height='20'
          width='80'
          color='var(--maincolor)'
          radius='9'
          ariaLabel='three-dots-loading'
          wrapperStyle={{}}
          wrapperClass=''
        />
      </p>
    </div>
  );
}

export default LoadResponseFilmai;
