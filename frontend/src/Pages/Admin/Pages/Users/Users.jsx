import React, { useEffect, useState } from 'react'
import Users from '../../Components/Users/Users'
import AddNewUser from '../../Components/AddNewUser/AddNewUser'

export default function AdminPanelUsere() {

    const [allUsers, setAllUsere] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = () => {
        fetch('http://localhost:4000/v1/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setAllUsere(result)
            })
    }


    return (
        <div>
            <AddNewUser getAllUsers={getAllUsers} />
            <Users allUsers={allUsers} getAllUsers={getAllUsers} />
        </div>
    )
}
