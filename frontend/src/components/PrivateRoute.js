import React from 'react'
import { useAuthContext } from '../contexts/AuthContext.js'
import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }) {
    const { isLoggedIn } = useAuthContext()
    return !isLoggedIn ? children : <Navigate to='/' />
}
