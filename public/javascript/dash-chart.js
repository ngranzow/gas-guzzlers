let carData = [], commuteData = [], gasPriceData = [];

async function dashChart() {
    await getCarData();

    let data = {
        labels: carData,
        datasets: [{
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
        options: {}
    };
    
    new Chart(
        document.getElementById('dashChart'),
        config
    );
}

async function getCarData() {
    const response = await fetch(`/api/car/`);
    const barChartData = await response.json();

    const carModel = barChartData.map( (x) => x.Model);
    const commutes = barChartData.map( (x) => x.commutes);
    const gas = barChartData.map( (x) => x.gas);

    for (var i = 0; i < carModel.length; i++) {
        const car = carModel[i];
        carData.push(car);
    }

    for (var i = 0; i < commutes.length; i++) {
        const commute = commutes[i].map( (i) => i.commute_distance);
        commuteData.push(commute);
    }

    for (var i = 0; i < gas.length; i++) {
        const gasPrice = gas[i].map( (i) => i.gas_price);
        gasPriceData.push(gasPrice);
    }
}

dashChart();