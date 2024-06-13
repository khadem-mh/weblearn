import React, { useReducer, useRef, useState, useEffect } from 'react'
import './Input.css'
import inputReducer from './InputReducer'

export default function Input({ inpPlaceholder, inpIcon, type, onValid, textarea = false }) {

    const validRef = useRef()
    const [isBlurInput, setIsBlurInput] = useState(false)
    const [state, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

    useEffect(() => {
        if (isBlurInput && state.value.length > 0) onValid({ type, valid: state.isValid, value: state.value })
        setIsBlurInput(false)
    }, [isBlurInput])

    //funcs
    const inpChangeHandler = event => dispatch({ type, value: event.target.value })

    return (
        <div className={`${!textarea ? 'user-datas__parent-input' : ''} ${state.isValid && !textarea ? 'valid-inp' : state.value.length !== 0 && !textarea ? 'not-valid-inp' : ''} `} ref={validRef}>
            {
                textarea ?
                    <textarea placeholder={inpPlaceholder} value={state.value} onChange={event => inpChangeHandler(event)} onBlur={() => setIsBlurInput(true)} className={`textarea-form ${state.isValid ? 'valid-inp' : state.value.length !== 0 ? 'not-valid-inp' : ''}`}></textarea>
                    :
                    <>
                        <input type="text" placeholder={inpPlaceholder} value={state.value} onChange={event => inpChangeHandler(event)} onBlur={() => setIsBlurInput(true)} />
                        {inpIcon}
                    </>
            }

        </div>
    )
}