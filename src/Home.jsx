import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import { useContextHook } from './context/context';
import { useEffect } from 'react';
function Home() {
  const { nightMode } = useContextHook();

  return (
    <div
      className={`bg-[url('./src/img/bg.png')] ${
        nightMode ? 'bg-[var(--backgroundNightMode)]' : 'white'
      } bg-cover bg-center min-h-screen bg-fixed`}
    >
      <Header />

      <Outlet />
    </div>
  );
}

export default Home;
