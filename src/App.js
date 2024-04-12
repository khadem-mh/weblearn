import React from "react"
import { useRoutes, useLocation } from "react-router-dom"
import routes from "./routes"
import routesAccount from "./Pages/MyAccount/routes"
//components
import Navbar from "./Components/Navbar/Navbar"
import Landing from "./Section/Landing/Landing"
import Footer from "./Components/Footer/Footer"

export default function App() {
  const location = useLocation()
  const router = useRoutes(routes)
  const routerAccount = useRoutes(routesAccount)

  return (
    <main>
      {
        location.pathname !== '/register' && location.pathname !== '/login' &&
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
        {routerAccount}
      </section>

      {
        location.pathname !== '/register' && location.pathname !== '/login' &&
        < Footer />
      }

    </main>
  )
}