import React from "react"
import { useRoutes, useLocation } from "react-router-dom"
import routes from "./routes"
//components
import Navbar from "./Components/Navbar/Navbar"
import Landing from "./Components/Landing/Landing"
import Footer from "./Components/Footer/Footer"
import MyAccount from "./Pages/MyAccount/Components/Account/MyAccount"
import PageFirstAccount from "./Pages/MyAccount/Pages/PageFirstAccount/PageFirstAccount";
// Contexts
import { AuthProvider } from "./Contexts/AuthContext"

export default function App() {
  const location = useLocation()
  if (location.pathname === '/my-account' || location.pathname === '/my-account/') routes[8].element = <MyAccount children={<PageFirstAccount />} />
  else routes[8].element = null
  const router = useRoutes(routes)


  return (
    <main>
      <AuthProvider>
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
      </AuthProvider>
    </main>
  )
}