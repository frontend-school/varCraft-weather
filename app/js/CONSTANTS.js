window.varCraft = window.varCraft || {};
window.varCraft.CONST = window.varCraft.CONST || {};

window.varCraft.CONST = {
    mainPage: ".js-main-page",
    loginPage: ".js-login-page",
    loginForm: ".js-login-form",
    logoutForm: ".js-logout-form",
    logoutFormMobile: ".js-logout-form_mobile",
    userNameField: ".js-user-name",
    timeDigitsField: ".js-main-time-digits",
    timeDayPartField: ".js-main-time-dayPart",
    cityField: ".js-location-city",
    cityFieldMobile: ".js-location-city-mobile",
    countryField: ".js-location-country",
    mobilePreviousState: ".js-mobile-previous",
    mobileNextState: ".js-mobile-next",
    mobileDayList: ".js-mobile-day-list",
    mobileDay0: ".js-mobile-list-day-0",
    mobileDay1: ".js-mobile-list-day-1",
    mobileDay2: ".js-mobile-list-day-2",
    mobileSettings: ".js-mobile-settings",
    activeForecast: "m-forecast_active",
    activeDayIndicator: "mobile-day-list__item_active",
    unactiveArrow: "mobile__change-day_hide",

    yesterday: {
            forecast: ".js-yesterday-forecast",
            forecastDate: ".js-yesterday-forecast-date",
            forecastDescription: ".js-yesterday-forecast-description",
            forecastDayTemp: ".js-yesterday-forecast-dayTemp",
            forecastNightTemp: ".js-yesterday-forecast-nightTemp",
            forecastHumidity: ".js-yesterday-forecast-humidity",
            forecastHumidityTitle: ".js-yesterday-forecast-humidity-title",
            forecastWind: ".js-yesterday-forecast-wind",
            forecastWindSpeed: ".js-yesterday-forecast-wind-speed",
            forecastWindDirection: ".js-yesterday-wind-direction",
            forecastMoon: ".js-yesterday-forecast-moon"
    },
    today: {
        forecast: ".js-today-forecast",
        forecastDate: ".js-today-forecast-date",
        forecastDescription: ".js-today-forecast-description",
        forecastDayTemp: ".js-today-forecast-dayTemp",
        forecastNightTemp: ".js-today-forecast-nightTemp",
        forecastHumidity: ".js-today-forecast-humidity",
        forecastHumidityTitle: ".js-today-forecast-humidity-title",
        forecastWind: ".js-today-forecast-wind",
        forecastWindSpeed: ".js-today-forecast-wind-speed",
        forecastWindDirection: ".js-today-wind-direction",
        forecastMoon: ".js-today-forecast-moon"
    },
    tomorrow: {
        forecast: ".js-tomorrow-forecast",
        forecastDate: ".js-tomorrow-forecast-date",
        forecastDescription: ".js-tomorrow-forecast-description",
        forecastDayTemp: ".js-tomorrow-forecast-dayTemp",
        forecastNightTemp: ".js-tomorrow-forecast-nightTemp",
        forecastHumidity: ".js-tomorrow-forecast-humidity",
        forecastHumidityTitle: ".js-tomorrow-forecast-humidity-title",
        forecastWind: ".js-tomorrow-forecast-wind",
        forecastWindSpeed: ".js-tomorrow-forecast-wind-speed",
        forecastWindDirection: ".js-tomorrow-wind-direction",
        forecastMoon: "j.s-tomorrow-forecast-moon"
    }
};

window.varCraft.CONST.regExps = {
        forecast: /forecast_[^\s]+/,
        wind: /forecast-extra-info__wind_[^\s]+/,
        humidity: /forecast-extra-info_humidity[^\s]+/,
        moon: /forecast-extra-info_/
        //forecast_[^\s]+
}