import React, { useReducer, useRef } from 'react'
import './Input.css'
import inputReducer from './InputReducer'

export default function Input({ inpPlaceholder, inpIcon, type }) {

    const validRef = useRef()
    const [state, dispatch] = useReducer(inputReducer, { value: '', isValid: false })
    const inpChangeHandler = event => dispatch({ type, value: event.target.value })
    
    return (
        <div className={`user-datas__parent-input ${state.isValid ? 'valid-inp' : state.value.length !== 0 ? 'not-valid-inp' : ''} `} ref={validRef}>
            <input type="text" placeholder={inpPlaceholder} value={state.value} onChange={event => inpChangeHandler(event)} />
            {inpIcon}
        </div>
    )
}