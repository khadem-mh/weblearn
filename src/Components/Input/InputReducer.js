import {
    inputFullName, inputUserName, inputPhoneNumber, inputEmail, inputPassword
} from "../../Types/TypesInput.js"
//func
import validateEmail from '../../Functions/ValidateEmail/ValidateEmail.js'

const inputReducer = (state, action) => {
    switch (action.type) {
        case inputFullName: case inputUserName: {
            let isRightVal = null
            action.value.length >= 6 && (isRightVal = true)
            action.value.length < 6 && (isRightVal = false)
            return {
                value: action.value,
                isValid: isRightVal
            }
        }
        case inputPhoneNumber: {
            return {
                value: action.value,
                isValid: action.value.length === 11 && action.value.slice(0, 2) === '09' ? true : false
            }
        }
        case inputEmail: {
            let isValidateEmail = validateEmail(action.value)
            return {
                value: action.value,
                isValid: isValidateEmail ? true : false
            }
        }
        case inputPassword: {
            return {
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