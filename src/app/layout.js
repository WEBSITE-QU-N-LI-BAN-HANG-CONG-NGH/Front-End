'use client'
import { useState } from 'react'
import Home1 from '../components/Home/Home1'
import "./globals.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <html>
          <body>
            <Home1/>
          </body>
      </html>
    </>
  )
}

export default App
