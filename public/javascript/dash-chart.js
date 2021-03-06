let carData = [], commuteData = [], gasPriceData = [], userData = [];

let userCar = [];
console.log(userCar);

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
        options: {
            plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Latest commutes and gas prices for each car'
                }
              }
        }
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
    const users = barChartData.map( (x) => x.user);

    for (var i = 0; i < users.length; i++) {
        const user = users[i].username;
        userData.push(user);
    }

    for (var i = 0; i < carModel.length; i++) {
        const car = carModel[i];
        carData.push(car);
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

    const userCar = userData.map((userData, i) => `${userData}'s ${carData[i]}`)
    return userCar;
}

dashChart();