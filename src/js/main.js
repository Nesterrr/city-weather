'use strict';

define(function() {
    const URL = 'https://query.yahooapis.com/v1/public/yql?format=json&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=';

    const CITY = {
        SP: 'Saint-Petersburg',
        V: 'Voronej',
        LA: 'Los-Angeles'
    };
    const select = document.querySelector('.menu-list');

    const template = document.querySelector('#template');

    const templateContainer = 'content' in template ? template.content : template;
    const weatherContainer = document.querySelector('.weather-container');
    var element = templateContainer.querySelector('.weather');

    function Weather (city) {
        this.city = city;
    }

    let fn = Weather.prototype;

    fn.getFromApi = (city, callback) => {
        this.city = city;

        this.url = URL + city + ')';

        var cbName = 'cb';

        var load = function(url, callback) {
            window[cbName] = function(data) {
                callback(data);
            };

            var script = document.createElement('script');
            script.src = url + '&callback=' + cbName;
            document.body.appendChild(script);
        };
        load(this.url, callback);
    }

    function get(city, render) {
        var wthr = new Weather();

        wthr.getFromApi('\'' + city + '\'', render);
    }

    function render(data) {
        if(!data) {
            console.log('Can not load data!');
        } else {
            const dt = data.query.results.channel;

            var nodeClone = element.cloneNode(true);

            nodeClone.querySelector('.city-name').textContent = dt.location.city;
            nodeClone.querySelector('.country').textContent = dt.location.country;
            nodeClone.querySelector('.time').textContent = dt.lastBuildDate;
            nodeClone.querySelector('.temp').textContent = Number(dt.item.condition.temp) - 32;
            nodeClone.querySelector('.text').textContent = dt.item.condition.text;
            weatherContainer.appendChild(nodeClone);
        }
    }

    select.addEventListener('click',(event) => {
        let evt = event.target;

        for (key in CITY) {
            if (CITY[key] === evt.textContent) {
                get(CITY[key], render);
            }
        }
    });
});
