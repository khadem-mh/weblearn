import React, { useEffect, Suspense } from "react"
import './Css/categories.css'
import { useRoutes, useLocation } from "react-router-dom"
import routes from "./routes"
import { InfosIndexPageProvider } from "./Contexts/InfosIndexPageContext"
//components
import Navbar from "./Components/Navbar/Navbar"
import Landing from "./Components/Landing/Landing"
import Footer from "./Components/Footer/Footer"
import MyAccount from "./Pages/MyAccount/Components/Account/MyAccount"
import PageFirstAccount from "./Pages/MyAccount/Pages/PageFirstAccount/PageFirstAccount";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTops"
// Contexts
import { AuthProvider } from "./Contexts/AuthContext"
//
import LoadingFallback from "./Components/LoadingFallback/LoadingFallback"

export default function App() {

  const location = useLocation()
  if (location.pathname === '/my-account' || location.pathname === '/my-account/') routes[11].element = <MyAccount children={<PageFirstAccount />} />
  else routes[11].element = null
  const router = useRoutes(routes)

  useEffect(() => {
    location.pathname.includes('/p-admin')
      ? document.body.style.cssText = "background-color: #F1F2F2; font-family: Lalezar"
      : document.body.style.cssText = 'background-color: var(--black-color) ; font-family: IRANSans'
  }, [location]);

  return (
    <main style={{ overflowX: "hidden" }}>
      <AuthProvider>
        <InfosIndexPageProvider>
          <Suspense fallback={<LoadingFallback />} >

            {
              !location.pathname.includes('p-admin') && location.pathname !== '/register' && location.pathname !== '/login' && !location.pathname.includes('/my-account') && location.pathname !== '/contactus' &&
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
              {
                router &&
                <>
                  {router}
                  <ScrollToTop />
                </>
              }
            </section>

            {
              !location.pathname.includes('p-admin') && location.pathname !== '/register' && location.pathname !== '/login' && !location.pathname.includes('/my-account') && location.pathname !== '/contactus' &&
              < Footer />
            }

          </Suspense>
        </InfosIndexPageProvider>
      </AuthProvider>
    </main >
  )
}