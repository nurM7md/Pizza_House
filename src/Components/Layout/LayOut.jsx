import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
     <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-24">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}

export default LayOut