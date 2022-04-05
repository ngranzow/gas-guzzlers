async function commuteFormHandler(event) {
    event.preventDefault();

    const gas_price = document.querySelector('input[name="gas-price"]').value.trim();
    const car_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/gas`, {
        method: 'POST',
        body: JSON.stringify({
            gas_price,
            car_id
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

document.querySelector('.new-gas-form').addEventListener('submit', commuteFormHandler);