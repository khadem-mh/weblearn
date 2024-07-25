import React, { useState, useEffect } from 'react'
import AddNewOff from '../../Components/AddNewOff/AddNewOff'
import Offs from '../../Components/Offs/Offs'

export default function AdminPanelOffs() {

    const [getOffs, setGetOffs] = useState([])

    useEffect(() => {
        getAllOffs()
    }, [])

    const getAllOffs = () => {
        fetch(`https://weblearning.liara.run/v1/offs`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setGetOffs(result)
            })
    }

    return (
        <div>
            <AddNewOff getAllOffs={getAllOffs} />
            <Offs getOffs={getOffs} getAllOffs={getAllOffs} />
        </div>
    )
}
