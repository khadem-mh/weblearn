export default function validateEmail(email) {
    var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,3}$/;
    return pattern.test(email);
}