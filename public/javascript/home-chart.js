let userData = [], commuteData = [], gasPriceData = [];

console.log(userData, commuteData, gasPriceData);

async function homeChart() {
    await getCarData();

    let data = {
        labels: userData,
        datasets: [{
            label: 'Commutes',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: gasPriceData,
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
        options: {}
    };
    
    let homeChart = new Chart(
        document.getElementById('homeChart'),
        config
    );
}

async function getCarData() {
    const response = await fetch(`/api/users`);
    const barChartData = await response.json();

    const usernames = barChartData.map( (x) => x.username);
    const commutes = barChartData.map( (x) => x.commutes);
    const gas = barChartData.map( (x) => x.gas);

    for (var i = 0; i < commutes.length; i++) {
        const commute = commutes[i].map( (i) => i.commute_distance);
        commuteData.push(commute);
    }

    for (var i = 0; i < gas.length; i++) {
        const gasPrice = gas[i].map( (i) => i.gas_price);
        gasPriceData.push(gasPrice);
    }

    userData.push(usernames);
}

homeChart(homeChart);