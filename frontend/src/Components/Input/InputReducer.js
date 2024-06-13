import {
    inputFullName, inputUserName, inputPhoneNumber, inputEmail, inputPassword, textArea
} from "../../Validators/RulesInput.js"
//func
import { validateEmail, validatePhone } from '../../Validators/Regex.js'

const inputReducer = (state, action) => {
    switch (action.type) {
        case inputFullName: case inputUserName: case textArea: {
            let isRightVal = null
            action.value.length >= 6 && (isRightVal = true)
            action.value.length < 6 && (isRightVal = false)
            return {
                value: action.value,
                isValid: isRightVal
            }
        }
        case 'CLEAN_INPUT': {
            return {
                value: action.value,
                isValid: action.valid
            }
        }
        case inputPhoneNumber: {
            let isValidatePhone = validatePhone(action.value)
            return {
                value: action.value,
                isValid: isValidatePhone ? true : false
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