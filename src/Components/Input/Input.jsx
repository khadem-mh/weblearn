import React, { useReducer } from 'react'
import './Input.css'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE-VALUE': {
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        }
        default: {
            return state
        }
    }
}

export default function Input({ inpPlaceholder, inpIcon }) {

    const [state, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false
    })

    const inpChangeHandler = event => {
        let inpValue = event.target.value
        dispatch({
            type: "CHANGE-VALUE",
            value: inpValue,
            isValid: true
        })
    }

    return (
        <div className='user-datas__parent-input'>
            <input type="text" placeholder={inpPlaceholder} value={state.value} onChange={event => inpChangeHandler(event)} />
            {inpIcon}
        </div>
    )
}