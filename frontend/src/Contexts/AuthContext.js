import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: null,
    login: () => { },
    logout: () => { },
})

export const AuthProvider = ({ children }) => {

    const location = useLocation()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [userInfos, setUserInfos] = useState({})

    useEffect(() => {
        const localStorageToken = JSON.parse(localStorage.getItem('user'))

        if (localStorageToken) {
            fetch('https://kind-tips-jam.loca.lt/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${localStorageToken.token}`
                }
            })
                .then(res => res.json())
                .then(datas => {
                    setIsLoggedIn(true)
                    setUserInfos(datas)
                    setToken(localStorageToken.token)

                    if ((location.pathname.includes('p-admin') && datas.role === "USER")) {
                        window.document.documentElement.style.filter = 'blur(100px)'
                        window.document.documentElement.style.opacity = '0'
                        window.location.pathname = '/my-account'
                    }

                })
        } else {
            if (location.pathname.includes('my-account') && !isLoggedIn || location.pathname.includes('p-admin') && !isLoggedIn) {
                window.document.documentElement.style.filter = 'blur(100px)'
                window.document.documentElement.style.opacity = '0'
                window.location.pathname = '/'
            }
        }

    }, [location, isLoggedIn])

    const login = (userInfo, token) => {
        setToken(token)
        setUserInfos(userInfo)
        setIsLoggedIn(true)
        localStorage.setItem('user', JSON.stringify({ token }))
    }

    const logout = () => {
        setToken(null)
        setIsLoggedIn(false)
        setUserInfos({})
        localStorage.removeItem('user')
    }

    const ContextValue = {
        isLoggedIn,
        token,
        userInfos,
        login,
        logout
    }

    return <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>

}