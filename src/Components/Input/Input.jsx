import React, { useReducer } from 'react'
import './Input.css'
import {
    inputFullName, inputUserName, inputPhoneNumber, inputEmail, inputPassword
} from "../../Types/TypesInput.js"
//func
import validateEmail from '../../Functions/ValidateEmail/ValidateEmail.js'

const inputReducer = (state, action) => {
    switch (action.type) {
        case inputFullName: case inputUserName: {
            return {
                ...state,
                value: action.value,
                isValid: action.value.length > 6 ? true : false
            }
        }
        case inputPhoneNumber: {
            return {
                ...state,
                value: action.value,
                isValid: action.value.length === 11 && action.value.slice(0, 2) === '09' ? true : false
            }
        }
        case inputEmail: {
            let isValidateEmail = validateEmail(action.value)
            return {
                ...state,
                value: action.value,
                isValid: isValidateEmail ? true : false
            }
        }
        case inputPassword: {
            return {
                ...state,
                value: action.value,
                isValid: action.value.length >= 8 ? true : false
            }
        }
        default: {
            return state
        }
    }
}

export default function Input({ inpPlaceholder, inpIcon, type }) {

    const [state, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false
    })

    const inpChangeHandler = event => {
        let inpValue = event.target.value
        dispatch({
            type,
            value: inpValue,
        })
    }

    return (
        <div className='user-datas__parent-input'>
            <input type="text" placeholder={inpPlaceholder} value={state.value} onChange={event => inpChangeHandler(event)} />
            {inpIcon}
        </div>
    )
}