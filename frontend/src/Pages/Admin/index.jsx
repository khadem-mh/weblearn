import React from "react";
import './Index.css'
import { Outlet } from "react-router-dom"

export default function AdminPanel() {

    return (
        <section>
            admin panel page

            <Outlet />
        </section>
    )
}