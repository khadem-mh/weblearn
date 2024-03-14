import React from 'react'
import './SearchInput.css'

export default function SearchInput({w, h, fz, iconFz}) {
    return (
        <div className="parent-searchbar">
            <div className="searchbar" style={{width: w, height: h}}>
                <input type="text" className="search-input" style={{fontSize: fz}} placeholder="چیو میخوای یاد بگیری؟" />
                <i className="fas fa-search search-icon" style={{fontSize: iconFz}}></i>
            </div>
        </div>
    )
}
