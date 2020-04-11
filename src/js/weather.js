import {
    format
} from 'date-fns';

class Weather {
    constructor() {
        this.params = (new URL(document.location)).searchParams;
        this.city = this.params.get('city');
        this.cityName = null;
        this.apiKey = '774384fa58572680f7bc37ab01913d7d';
        this.apiQuery = `q=${this.cityName}`;
        this.apiCall = `https://api.openweathermap.org/data/2.5/weather?${this.apiQuery}&units=metric&appid=${this.apiKey}`;
    }
    findLocation() {
        function success() {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            apiQuery = `lat=${lat}&lon=${lon}`;

            fetch(this.apiCall)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.displayData();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        function error() {
            console.log('Unable to retrieve your location');
        }

        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    byCityName() {

        this.city === null ? this.cityName = 'london' : this.cityName = city;

        fetch(this.apiCall)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.displayData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    displayData() {
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

        const currentDate = format(new Date(), 'dd-MMM-yyyy, HH:mm');
        const timeCnt = document.querySelector('.weather__time');

        timeCnt.innerHTML = `${currentDate}`;
    }

    startCall() {
        /* if (this.cityName === null) {
            this.findLocation();
        } else {
            this.byCityName();
        } */

        this.byCityName();
    }
}

export default Weather;