async function commuteFormHandler(event) {
    event.preventDefault();

    const commute_text = document.querySelector('input[name="commute"]').value.trim();
    const car_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commute_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                commute_text,
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
}

document.querySelector('.commute-form').addEventListener('submit', commuteFormHandler);