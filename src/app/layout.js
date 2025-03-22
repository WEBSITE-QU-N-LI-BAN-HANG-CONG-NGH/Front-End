'use client'
import { useState } from 'react'
import Home1 from '../components/Home/Home1'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
import Catalog1 from '../components/Catalog/Catalog1'
>>>>>>> Stashed changes
>>>>>>> Stashed changes
=======
import Catalog1 from '../components/Catalog/Catalog1'
>>>>>>> Stashed changes
import "./globals.css"

function App() {
  const [currentPage, setCurrentPage] = useState('home') // State to track the current page

  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home1 />
    }
    if (currentPage === 'catalog') {
      return <Catalog1 />
    }
  }

  return (
    <>
      <html>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
          <body>
            <Home1/>
          </body>
=======
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        <body>
          <nav>
            {/* Navigation buttons */}
            <button className="mr-5" onClick={() => setCurrentPage('home')}>Home</button>
            <button className="mr-5" onClick={() => setCurrentPage('catalog')}>Catalog</button>
          </nav>
          {/* Render the selected page */}
          {renderPage()}
        </body>
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      </html>
    </>
  )
}

export default App
