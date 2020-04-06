import { format } from 'date-fns';

let params = (new URL(document.location)).searchParams;
let city = params.get('city');
let cityName;

city === null ? cityName = 'london' : cityName = city;

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

        const cityCnt = document.querySelector('.weather__city');
        const iconCnt = document.querySelector('.weather__icon');
        const icon = new Image();
        const tempCnt = document.querySelector('.weather__temp');
        const descCnt = document.querySelector('.weather__desc');
        
        cityCnt.innerHTML = `<h3>${data.name}, ${data.sys.country}</h3>`;
        tempCnt.innerHTML = `<p>${Math.round(data.main.temp, 0)}&#176;C</p>`;
        data.weather.forEach(el => {
            icon.src = `https://openweathermap.org/img/wn/${el.icon}@2x.png`;
            iconCnt.appendChild(icon);
            descCnt.innerHTML = `<p>${el.description}</p>`;
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    const currentDate = format(new Date(), 'dd-MMM-yyyy, HH:mm (cccc)');
    const timeCnt = document.querySelector('.weather__time');

/*     timeCnt.innerHTML = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`; */
    timeCnt.innerHTML = `${currentDate}`;