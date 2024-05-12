import { createContext, useState } from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: null,
    login: () => { },
    logout: () => { },
})

export const AuthProvider = children => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [userInfos, setUserInfos] = useState({})

    const login = () => {

    }

    const logout = () => {

    }

    const ContextValue = {
        isLogin: isLoggedIn,
        userToken: token,
        userInformation: userInfos,
        login,
        logout
    }

    return <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>

}