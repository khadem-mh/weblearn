export const validateEmail = email => {
    var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/
    return pattern.test(email);
}

export const validatePhone = phone => {
    var pattern = /^09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}$/ //  09123456789  0912-345-6789  . mean -? maby - exist
    return pattern.test(phone)
}