import React, { useReducer } from 'react'
import './Input.css'
import inputReducer from './InputReducer'

export default function Input({ inpPlaceholder, inpIcon, type }) {

    const [state, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

    const inpChangeHandler = event => dispatch({ type, value: event.target.value })

    const inputFocusHandler = e => {
        console.log(e)
    }

    return (
        <div className='user-datas__parent-input'>
            <input type="text" placeholder={inpPlaceholder} value={state.value} onChange={event => inpChangeHandler(event)} onFocus={(e) => inputFocusHandler(e)} />
            {inpIcon}
        </div>
    )
}