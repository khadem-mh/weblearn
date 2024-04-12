import React, { Children } from 'react'
import './MyAccount.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

export default function MyAccount({ children }) {


    return (
        <div>
            test
            {children}
        </div>
    )
}
