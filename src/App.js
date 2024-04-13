import React from "react"
import { useRoutes, useLocation } from "react-router-dom"
import routes from "./routes"
//components
import Navbar from "./Components/Navbar/Navbar"
import Landing from "./Section/Landing/Landing"
import Footer from "./Components/Footer/Footer"

export default function App() {
  const location = useLocation()
  const router = useRoutes(routes)
  return (
    <main>
      {
        location.pathname !== '/register' && location.pathname !== '/login' && !location.pathname.includes('/my-account') &&
        <header className="header">
          {
            routes[0].path === location.pathname ?
              (
                <>
                  <div className="hty"></div>
                  <Navbar />
                  <Landing />
                </>
              )
              : <Navbar />
          }
        </header>
      }


      <section className={location.pathname === '/' ? 'app' : ''}>
        {router}
      </section>

      {
        location.pathname !== '/register' && location.pathname !== '/login' && !location.pathname.includes('/my-account') &&
        < Footer />
      }

    </main>
  )
}