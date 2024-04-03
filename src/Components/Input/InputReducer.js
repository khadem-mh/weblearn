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
                isValid: action.value.length > 5 ? true : false
            }
        }
        case inputPhoneNumber: {
            return {
                ...state,
                value: action.value,
                isValid: action.value.length === 10 && action.value.slice(0, 2) === '09' ? true : false
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

export default inputReducer