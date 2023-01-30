// form hooks
const loginFormEl = document.getElementById('login-form');
const signupFormEl = document.getElementById('signup-form');
// callback fn for when user clicks login btn
const loginFormHandler = async (event) => {
   event.preventDefault();
   // getting data from username and password fields
   const username = document.getElementById('username-login').value.trim();
   const password = document.getElementById('password-login').value;
   // did the user provide both a username and a password?
   if (username && password) {
      // try to log the user in using the information provided
      const response = await fetch('/api/user/login', {
         method: 'POST',
         body: JSON.stringify({
            username,
            password
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      if (response.ok) {
         // gottem
         document.location.replace('/');
      } else {
         // stop. get some help
         alert('Incorrect username or password.');
      }
   }
}
// callback fn for when user clicks create acc btn
const signupFormHandler = async (event) => {
   event.preventDefault();
   // getting data from form fields
   const name = document.getElementById('name-signup').value.trim();
   const username = document.getElementById('username-signup').value.trim();
   const password = document.getElementById('password-signup').value;
   const c_password = document.getElementById('c-password-signup').value;
   // did the user provide all req'd fields?
   if (name && username && password && c_password) {
      // do the passwords match?
      if (password === c_password) {
         // try to create a user using the information provided
         const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
               name,
               username,
               password
            }),
            headers: {
               'Content-Type': 'application/json'
            }
         });
         if (response.ok) {
            // gottem
            document.location.replace('/');
         } else {
            // stop. get some help
            alert('Invalid signup information. Try again.');
         }
      }
   }
}
// add event listeners to the submit buttons
loginFormEl.addEventListener('submit', loginFormHandler);
signupFormEl.addEventListener('submit', signupFormHandler);