import { format } from 'date-fns';

function weatherApp() {

    let params = (new URL(document.location)).searchParams;
    let city = params.get('city');
    let cityName = city;


    const apiKey = '774384fa58572680f7bc37ab01913d7d';
    let apiQuery = `q=${cityName}`;
    let apiCall = `https://api.openweathermap.org/data/2.5/weather?${apiQuery}&units=metric&appid=${apiKey}`;

    if (city === null) {

        function success(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            apiQuery = `lat=${lat}&lon=${lon}`;
            apiCall = `https://api.openweathermap.org/data/2.5/weather?${apiQuery}&units=metric&appid=${apiKey}`;

            console.log("success -> apiQuery", apiQuery)

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

                    const currentDate = format(new Date(), 'dd-MMM-yyyy, HH:mm');
                    const timeCnt = document.querySelector('.weather__time');

                    timeCnt.innerHTML = `${currentDate}`;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        function error() {
            console.log('Unable to retrieve your location');
            window.alert('Unable to retrieve your location');
        }

        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }

    } else {
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

            const currentDate = format(new Date(), 'dd-MMM-yyyy, HH:mm');
            const timeCnt = document.querySelector('.weather__time');

            timeCnt.innerHTML = `${currentDate}`;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export default weatherApp;