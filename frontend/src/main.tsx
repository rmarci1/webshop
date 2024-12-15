import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './components/Products';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { GlobalProvider } from './context/GlobalProvider';
import Profile from './components/Profile';

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
      path: "profile",
      element: <Profile/>
    }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router}></RouterProvider>
    </GlobalProvider>
  </StrictMode>,
)
