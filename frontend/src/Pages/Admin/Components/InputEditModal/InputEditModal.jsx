import React from 'react'
import './InputEditModal.css'

export default function InputEditModal({ cildren, placeHolderInp, valInp, setValInp, dis = false }) {

    return (
        <div className='edit-products-form-group'>
            <span>
                {cildren}
            </span>
            <input type="text" minLength={3} disabled={dis} value={valInp || ""} onChange={e => setValInp(e.target.value)} placeholder={placeHolderInp} className='edit-products-input text-black' />
        </div>
    )
}
