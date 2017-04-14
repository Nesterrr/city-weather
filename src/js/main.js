'use strict';

define(function() {
    const URL = 'https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=';

    const CITY = {
        SP: 'Санкт-Петербург',
        V: 'Воронеж',
        LA: 'Лос-Анджелес'
    };
    const select = document.querySelector('.city-name');

    function getWeather(city) {

    }
    function Weather (city) {
        this.city = city;
    }

    let fn = Weather.prototype;

    fn.getFromApi = (city) => {
        this.city = city;

        this.url = URL + city + ')';
        console.log('getFromApi');
        return this.url;
    }

    var wthr = new Weather();


    select.addEventListener('click',(event) => {
        let evt = event.target;
        for(key in CITY) {
            if(CITY[key] === evt.value){
                wthr.getFromApi('\'' + CITY[key] + '\'');
            }
        }
    });
});
