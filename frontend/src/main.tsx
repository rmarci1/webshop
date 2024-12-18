import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './pages/Products';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { GlobalProvider } from './context/GlobalProvider';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/products",
      element: <Products/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
    {
      path: "/cart",
      element: <Cart/>
    }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router}></RouterProvider>
    </GlobalProvider>
  </StrictMode>,
)
