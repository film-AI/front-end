import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { useContextHook } from '../context/context';
function MovieBanner({ img, title, description, vote_average }) {
  const { nightMode } = useContextHook();

  return (
    <div
      className='w-[403px] relative flex flex-col items-center gap-2 border-b border-black'
      style={{ zoom: '0.7' }}
    >
      <img
        className='w-[300px]'
        src={`https://image.tmdb.org/t/p/original${img}`}
      />
      <Rating
        emptyStyle={{ display: 'flex' }}
        fillStyle={{ display: '-webkit-inline-box' }}
        initialValue={vote_average / 2}
        readonly={true}
      />
      <div
        className={`w-[403px] h-11 text-center ${
          nightMode ? 'text-white' : 'text-black'
        } text-[20px] font-normal font-['League Spartan']`}
      >
        {title}
      </div>
      <div
        className={`w-[419px] max-h-50 h-full text-[15px] text-center ${
          nightMode ? 'text-white' : 'text-black'
        } font-light font-['League Spartan']`}
      >
        {description}
      </div>

      <a
        className={` text-center bg-corPrincipal text-white text-[25px] font-semibold font-['League Spartan'] mt-4 p-3 mb-12 rounded-md cursor-pointer  hover:bg-slate-400`}
        href={`https://www.google.com/search?q=${encodeURIComponent(title)}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        Ver mais
      </a>
    </div>
  );
}

export default MovieBanner;
