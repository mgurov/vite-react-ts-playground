import { useState } from 'react'
import { Outlet, RouterProvider } from "react-router-dom";

import './App.css'
import { createRouter } from './routing';


function App() {
  const router = createRouter({layout: <Layout />})

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


function Layout() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 data-testid="global-title">Vite + React</h1>
      <Outlet />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
  
}

export default App
