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
        const localStorageToken = JSON.parse(localStorage.getItem('user')).token
        if (localStorageToken) {
            fetch('http://localhost:4000/v1/auth/me', {
                headers: {
                    Authorization: `Bearer ${localStorageToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsLoggedIn(true)
                    setUserInfos(data)
                    setToken(localStorageToken)
                    console.log(data);
                })
        }
    }, [location])

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