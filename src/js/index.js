console.log("Weather App");

let cityName;
cityName = 'Legnica';
const apiKey = '774384fa58572680f7bc37ab01913d7d';
const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;


console.log(apiCall);

fetch(apiCall)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log(`City: ${data.name} (${data.sys.country})`);
        console.log(`Temp: ${Math.round(data.main.temp, 0)} C`);
        data.weather.forEach(el => {
            console.log(`Weather: ${el.main}`);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });    