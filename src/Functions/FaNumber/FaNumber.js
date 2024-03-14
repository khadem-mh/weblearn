const faNumber = (num1, num2, num3, dotte = false) => {
    if (num1 && num2 && num3) return (num1.toLocaleString('fa', { useGrouping: false }) + '/' + num2.toLocaleString() + '/' + num3.toLocaleString())
    else if (num1 && num2 && !num3 && dotte === false) return (num1.toLocaleString() + ':' + num2.toLocaleString())
    else if (num1 && dotte === false) return num1.toLocaleString()
    else if (num1 && dotte) return num1.toLocaleString() + '.' + num2.toLocaleString()
}

export default faNumber