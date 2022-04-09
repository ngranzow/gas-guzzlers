let userData = [], commuteData = [], gasPriceData = [];

async function homeChart() {
    await getUserData();

    let data = {
        labels: userData,
        datasets: [{
            axis: 'y',
            label: 'Commutes',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: commuteData,
        },
        {
            label: 'Gas Prices',
            backgroundColor: 'rgb(155, 99, 132)',
            borderColor: 'rgb(155, 99, 132)',
            data: gasPriceData,
        }
        ]
    };

    let config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Latest commutes and gas prices for each user'
                }
            }
        }
    };

    new Chart(
        document.getElementById('homeChart'),
        config
    );
}

async function getUserData() {
    const response = await fetch(`/api/users`);
    const barChartData = await response.json();

    const usernames = barChartData.map((x) => x.username);
    const commutes = barChartData.map((x) => x.commutes);
    const gas = barChartData.map((x) => x.gas);

    for (var i = 0; i < usernames.length; i++) {
        const username = usernames[i];
        userData.push(username);
    }

    for (var i = 0; i < commutes.length; i++) {
        const commute = commutes[i].map((i) => i.commute_distance);
        const lastCommute = commute[commute.length - 1];
        commuteData.push(lastCommute);
    }

    for (var i = 0; i < gas.length; i++) {
        const gasPrice = gas[i].map((i) => i.gas_price);
        const lastGas = gasPrice[gasPrice.length - 1];
        gasPriceData.push(lastGas);
    }
}

homeChart();