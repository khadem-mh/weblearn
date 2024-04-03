import React, { useReducer, useRef } from 'react'
import './Input.css'
import inputReducer from './InputReducer'

export default function Input({ inpPlaceholder, inpIcon, type }) {

    const validRef = useRef()
    const [state, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

    const inpChangeHandler = event => {
        dispatch({ type, value: event.target.value })
        
        if (event.target.value.length === 0) {
            validRef.current.classList.remove('not-valid-inp')
            validRef.current.classList.remove('valid-inp')
        }

        if (!state.isValid) {
            if (event.target.value.length === 0) validRef.current.classList.remove('not-valid-inp')
            else {
                validRef.current.classList.remove('valid-inp')
                validRef.current.classList.add('not-valid-inp')
            }
        }

        if (state.isValid) {
            if (event.target.value.length === 0) validRef.current.classList.remove('valid-inp')
            else {
                validRef.current.classList.remove('not-valid-inp')
                validRef.current.classList.add('valid-inp')
            }
        }
    }

    const inputBlurHandler = e => {
        console.log(e);
    }

    return (
        <div className='user-datas__parent-input' ref={validRef}>
            <input type="text" placeholder={inpPlaceholder} value={state.value} onChange={event => inpChangeHandler(event)} onBlur={(e) => inputBlurHandler(e)} />
            {inpIcon}
        </div>
    )
}