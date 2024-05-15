import { createContext, useState } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: null,
    login: () => { },
    logout: () => { },
})

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [userInfos, setUserInfos] = useState({})

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