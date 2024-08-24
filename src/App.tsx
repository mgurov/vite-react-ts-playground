import { useState } from 'react'
import { RouterProvider } from "react-router-dom";

import './App.css'
import { createRouter } from './routes';


function App() {
  const [count, setCount] = useState(0)
  const router = createRouter()

  return (
    <>
      <h1>Vite + React</h1>
      <RouterProvider router={router} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
