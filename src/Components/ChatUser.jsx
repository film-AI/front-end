import React from 'react';

function ChatUser({ question }) {
  return (
    <div className='max-w-[700px] w-full gap-3 flex  justify-end '>
      <p className="max-w-[450px] rounded-lg p-3 bg-UserInputColor text-black text-[15px] font-light font-['League Spartan'] text-right flex items-center">
        {question}
      </p>
    </div>
  );
}

export default ChatUser;
