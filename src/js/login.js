function validate() {

let username = document.getElementBYId('username').
value;
let password = document.getElementById('password').
value;

if(username === 'Webdev'&& password === 'learn')
{
    alert('Login successful!');
} else {
    alert('Login failed');
}
}

