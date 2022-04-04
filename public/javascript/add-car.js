async function newFormHandler(event) {
  event.preventDefault();

  const make = document.querySelector('input[name="car-make"]').value;
  const model = document.querySelector('input[name="car-model"]').value;
  const year = document.querySelector('input[name="car-year"]').value;
  const mpg = document.querySelector('input[name="car-mpg"]').value;


  const response = await fetch(`/api/cars`, {
    method: 'CAR',
    body: JSON.stringify({
      make,
      model,
      year,
      mpg
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
