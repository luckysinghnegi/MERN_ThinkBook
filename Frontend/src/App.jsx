import React from 'react'
import { Outlet } from 'react-router'
import NavBar from './Component/NavBar'


export default function App() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>

    )
}
