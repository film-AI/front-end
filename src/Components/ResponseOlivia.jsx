import React from 'react';

function ResponseOlivia({ response }) {
  return (
    <div className='flex max-w-[700px] w-full gap-3'>
      <img className=' h-[50px]  rounded-[18px]' src='./src/img/logo.png' />
      <p className="w-[450px] rounded-lg p-3 bg-chatBotColor text-black text-[15px] font-light font-['League Spartan'] text-left flex items-center">
        {response}
      </p>
    </div>
  );
}

export default ResponseOlivia;
