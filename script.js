const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

// Remember Me element (Sirf login page par hoga)
const rememberMeCheckbox = document.getElementById('remember-me');

// --- 1. Page Load Logic ---
window.addEventListener('load', () => {
    // Agar hum login page par hain aur koi email saved hai
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');
    if (savedEmail && email_input && !firstname_input) {
        email_input.value = savedEmail;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
        if(savedPassword){
            password_input.value = savedPassword;
        }
    }
});

form.addEventListener("submit", (e)=>{
    // e.preventDefault();

    let errors = [];

    if(firstname_input){
        // if we have a firstname input then we are in signup
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    }
    else{
        // If we don't have firstname input then we are in the login page
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }
    if(errors.length === 0 && rememberMeCheckbox){
        if(rememberMeCheckbox.checked){
            localStorage.setItem('userEmail', email_input.value);
            localStorage.setItem('userPassword', password_input.value);
        }else{
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
        }
    }

    if(errors.length > 0){
        // If there are any errors 
        e.preventDefault();
        error_message.innerText = errors.join(". ");
    }
})
function getSignupFormErrors(firstname, email, password, repeatPassword){
    let errors = [];

    if(firstname === '' || firstname == null){
        errors.push('First Name is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    if(password.length < 8){
        errors.push('Password must have atleast 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }
    if(password !== repeatPassword){
        errors.push('Password does not match repated password');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password){
    let errors = [];

    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}



const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener('input', ()=>{
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    })
})

