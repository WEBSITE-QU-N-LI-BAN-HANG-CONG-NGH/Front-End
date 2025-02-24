'use client'
import { useState } from 'react'
import Register1 from '../components/auth/Register1'
import "./globals.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <html>
          <body>
            <Register1/>
          </body>
      </html>
    </>
  )
}

export default App
