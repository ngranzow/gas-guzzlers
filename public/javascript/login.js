//toastr - welcom to site pop up
Command: toastr["success"]("Welcome to our Site!", "Welcome")

//loginFormHandler function - user login via email & password
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {

      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}

//signupFormHandler function - user sign up via username, email, & password
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {

      // console.log("hello");
      document.location.replace('/dashboard/');

    } else {
      alert(response.statusText);
    }
  }
}


//event listeners
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);