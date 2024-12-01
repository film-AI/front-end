import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Routes/App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';
import Hub from './Routes/Hub.jsx';
import { ContextProvider } from './context/context.jsx';

const router = createBrowserRouter([
  {
    element: <Home />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/hub',
        element: <Hub />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ContextProvider>
);
