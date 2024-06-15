import React, { useState } from 'react'
import './SearchInput.css'
import { Link } from 'react-router-dom'

export default function SearchInput({ w, h, fz, iconFz }) {

    const [searchValInput, setSearchValInput] = useState('')

    const handleSearchValInput = event => setSearchValInput(event.target.value)

    const movePageSearch = event => {
        if (searchValInput.length >= 3) return true
        else {
            event.preventDefault()
            return false
        }
    }

    return (
        <div className="parent-searchbar">
            <div className="searchbar" style={{ width: w, height: h }}>
                <input type="text" value={searchValInput} onChange={e => handleSearchValInput(e)} className="search-input" style={{ fontSize: fz }} placeholder="چیو میخوای یاد بگیری؟" />
                <Link to={`/search/q=${searchValInput}`} onClick={e => movePageSearch(e)}>
                    <i className="fas fa-search search-icon" style={{ fontSize: iconFz }}></i>
                </Link>
            </div>
        </div>
    )
}
