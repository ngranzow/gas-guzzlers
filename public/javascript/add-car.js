async function newFormHandler(event) {
  event.preventDefault();

  const Make = document.querySelector('input[name="car-make"]').value.trim();
  const Model = document.querySelector('input[name="car-model"]').value.trim();
  const Year = document.querySelector('input[name="car-year"]').value.trim();
  const MPG = document.querySelector('input[name="car-mpg"]').value.trim();
  
  const response = await fetch(`/api/car`, {
    method: 'POST',
    body: JSON.stringify({
      Make,
      Model,
      Year,
      MPG
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-car-form').addEventListener('submit', newFormHandler);
