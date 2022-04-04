async function commentFormHandler(event) {
  event.preventDefault();

  const commute_distance = document.querySelector('textarea[name="commute-distance"]').value.trim();
  const car_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (commute_distance) {
    const response = await fetch('/api/commutes', {
      method: 'CAR',
      body: JSON.stringify({
        car_id,
        commute_distance
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.commute-form').addEventListener('submit', commentFormHandler);
