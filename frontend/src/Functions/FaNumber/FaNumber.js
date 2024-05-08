const faNumber = (num1, num2, num3, dotte = false) => {
    if (num1 && num2 && num3) return (num1.toLocaleString('fa', { useGrouping: false }) + '/' + num2.toLocaleString() + '/' + num3.toLocaleString())
    else if (num1 && num2 && !num3 && dotte === false) {

        let number1
        let number2

        if (num1.length > 1 || num2.length > 1) {
            if (num1[0] === '0')
                number1 = (0).toLocaleString() + Number(num1[1]).toLocaleString()
            else
                number1 = Number(num1).toLocaleString()
            if (num2[0] === '0')
                number2 = (0).toLocaleString() + '' + Number(num2[1]).toLocaleString()
            else
                number2 = Number(num2).toLocaleString()
        }

        if (num1.length > 1 && num2.length > 1) {
            return number1 + ':' + number2
        }

        if (number1 && !number2) 
            return number1 + ':' + num2
        else if (!number1 && number2) {
            return num1 + ':' + number2
        }


    }
    else if (num1 && dotte === false) return num1.toLocaleString()
    else if (num1 && dotte) return num1.toLocaleString() + '.' + num2.toLocaleString()
}

export default faNumber