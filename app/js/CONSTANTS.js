window.varCraft = window.varCraft || {};
window.varCraft.CONSTANTS = window.varCraft.CONSTANTS || {};

window.varCraft.CONSTANTS.cssNames = {
    mainPage: ".js-main-page",
    loginPage: ".js-login-page",
    loginForm: ".js-login-form",
    logoutForm: ".js-logout-form",
    logoutFormMobile: ".js-logout-form_mobile",
    userNameField: ".js-user-name",
    timeDigitsField: ".js-main-time-digits",
    timeDayPartField: ".js-main-time-dayPart",
    yesterday: {
            forecastField: ".js-yesterday-forecast",
            forecastDateField: ".js-yesterday-forecast-date",
            forecastDescriptionField: ".js-yesterday-forecast-description",
            forecastDayTempField: ".js-yesterday-forecast-dayTemp",
            forecastNightTempField: ".js-yesterday-forecast-nightTemp",
            forecastHumidityField: ".js-yesterday-forecast-humidity",
            forecastHumidityTitleField: ".js-yesterday-forecast-humidity-title",
            forecastWindField: ".js-yesterday-forecast-wind",
            forecastWindSpeedField: ".js-yesterday-forecast-wind-speed",
            forecastWindDirectionField: ".js-yesterday-wind-direction",
            forecastMoonField: ".js-yesterday-forecast-moon"
    },
    today: {
        forecastField: ".js-today-forecast",
        forecastDateField: ".js-today-forecast-date",
        forecastDescriptionField: ".js-today-forecast-description",
        forecastDayTempField: ".js-today-forecast-dayTemp",
        forecastNightTempField: ".js-today-forecast-nightTemp",
        forecastHumidityField: ".js-today-forecast-humidity",
        forecastHumidityTitleField: ".js-today-forecast-humidity-title",
        forecastWindField: ".js-today-forecast-wind",
        forecastWindSpeedField: ".js-today-forecast-wind-speed",
        forecastWindDirectionField: ".js-today-wind-direction",
        forecastMoonField: ".js-today-forecast-moon"
    },
    tomorrow: {
        forecastField: ".js-tomorrow-forecast",
        forecastDateField: ".js-tomorrow-forecast-date",
        forecastDescriptionField: ".js-tomorrow-forecast-description",
        forecastDayTempField: ".js-tomorrow-forecast-dayTemp",
        forecastNightTempField: ".js-tomorrow-forecast-nightTemp",
        forecastHumidityField: ".js-tomorrow-forecast-humidity",
        forecastHumidityTitleField: ".js-tomorrow-forecast-humidity-title",
        forecastWindField: ".js-tomorrow-forecast-wind",
        forecastWindSpeedField: ".js-tomorrow-forecast-wind-speed",
        forecastWindDirectionField: ".js-tomorrow-wind-direction",
        forecastMoonField: ".js-tomorrow-forecast-moon"
    }
};

window.varCraft.CONSTANTS.regExps = {
        forecast: /forecast_.+\s/,
        wind: /forecast-extra-info__wind_.+\s/,
        humidity: /forecast-extra-info_humidity.+\s/,
        moon: /forecast-extra-info_/
}