import React from 'react'
import './InputEditModal.css'

export default function InputEditModal({ cildren, placeHolderInp, valInp, setValInp, dis = false, multiInp = '' }) {

    return (
        <div className='edit-products-form-group'>
            <span>
                {cildren}
            </span>
            <input type="text" minLength={3} disabled={dis} value={valInp || ""} onChange={e => multiInp.length >= 1
                ?
                setValInp(prev => { return { ...prev, multiInp: e.target.value } })
                :
                setValInp(e.target.value)} placeholder={placeHolderInp} className='edit-products-input' />
        </div>
    )
}
