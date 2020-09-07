const api = {
    key:"464a50add7e3042a20caff16d14c3aab",
    baseurl: "https://api.openweathermap.org/data/2.5/",
    icons: "http://openweathermap.org/img/wn/"
};

const searchBox = document.querySelector('.input-val');
const searchBtn = document.querySelector('.search-btn');
const body = document.querySelector('body');


searchBtn.addEventListener('click', () => {
    getResults(searchBox.value)
    
});    

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
    localStorage.clear();
}

function displayResults(weather) {

    let city = document.querySelector('.city p');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    localStorage.setItem('city', city.innerHTML);

    let weatherIcon = document.querySelector('.weather img');
    let icon = weather.weather[0].icon;
    weatherIcon.src = api.icons + icon + '@2x.png';
    localStorage.setItem(weatherIcon, weatherIcon.src);

    if (icon.includes('d')) {
        body.style.backgroundImage ="url(./img/day.svg)";
        localStorage.setItem('isDay', 'true');
    } else {
        body.style.backgroundImage ="url(./img/night.svg)";
        localStorage.setItem('isDay', 'false');
    }

    let dateTime = weather.dt + (weather.timezone) ;

    let now = new Date(dateTime * 1000);
    let date = document.querySelector('.date p');
    date.innerHTML = dateBuilder(now);
    localStorage.setItem('date', date.textContent);

    let temp = document.querySelector('.temp p');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span>`;
    localStorage.setItem('temp', temp.innerHTML);

    let weather_el = document.querySelector('.weather h2');
    weather_el.innerHTML = weather.weather[0].main;
    localStorage.setItem(weather_el, weather_el.innerHTML);

    let description = document.querySelector('.description p');
    description.innerHTML = weather.weather[0].description;
    localStorage.setItem('desc', description.innerHTML);

     
    let dateObj = new Date(dateTime * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let year = dateObj.getFullYear();
    let month = dateObj;
    

    let timeString = hours.toString().padStart(2, '0') + ' : ' + minutes.toString().padStart(2, '0');
    let time = document.querySelector('.time p');
    time.innerHTML = timeString;
    localStorage.setItem('time', timeString);

    console.log(timeString);
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

window.onload = function () {
    
    if (localStorage.length !== 0) {
        let city = document.querySelector('.city p');
        let date = document.querySelector('.date p');
        let weather_el = document.querySelector('.weather h2');
        let temp = document.querySelector('.temp p');
        let weatherIcon = document.querySelector('.weather img');
        let time = document.querySelector('.time p');
        let description = document.querySelector('.description p');

        city.innerHTML = localStorage.getItem('city');
        date.innerHTML = localStorage.getItem('date');
        weather_el.innerHTML = localStorage.getItem(weather_el);
        temp.innerHTML = localStorage.getItem('temp');
        weatherIcon.src = localStorage.getItem(weatherIcon);
        description.innerHTML = localStorage.getItem('desc');
        time.innerHTML = localStorage.getItem('time');

        if (localStorage.getItem('isDay') === 'true') {
            body.style.backgroundImage ="url(./img/day.svg)";            
        } else {
            body.style.backgroundImage ="url(./img/night.svg)";            
        }
}
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
        .then(reg => {
            console.log('congrats, scope is: ', reg);
        })
        .catch(err => {
            console.log('sorry', err);
        });
    })
}

