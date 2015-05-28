window.VarCraft = window.VarCraft || {};

window.VarCraft.CONST = {
    SELECTORS: {
        LOGIN_WRAPPER: ".login",
        USER_LOGIN: "#login",
        USER_PASSWORD: "#password",
        USER_LOGIN_LABEL: "#username",
        LOGIN_BUTTON: "#log-in",
        LOGOUT_BUTTON: "#log-out",
        TIME: ".js-time",
        MIDDAY: ".js-midday",
        DATE: ".js-date",
        CITY: ".js-city",
        COUNTRY: ".js-country",
        // weather
        YESTERDAY: ".column_yesterday",
        TODAY: ".column_today",
        TOMORROW: ".column_tomorrow",
        DAY_TEMP: ".column-data__daily-temp",
        NIGHT_TEMP: ".column-data__night-temp",
        WEATHER_DAY: ".column-header__date",
        WEATHER_CONDITION_ICON: ".column-data__condition-icon",
        WEATHER_CONDITION_TITLE: ".column-data__condition-title",
        HUMIDITY: ".column-data-other__humidity",
        MOON_ICON: ".column-data-other-moon__icon",
        MOON_LABEL: ".column-data-other-moon__label",
        WIND_LABEL: ".column-data-other-wind__label",
        WIND_DIRECTION: ".column-data-other-wind__direction",
        WIND_VALUE: ".column-data-other-wind__value"
    },

    COOKIES: {
        DURATION: 60*30*1000
    },

    ACTION: {
        SET_TIME: "datetime/model:setTime",
        SET_DATE: "datetime/model:setDate",
        LOGGED_IN: "login/controller:loggedIn",
        LOGGED_OUT: "logout/controller:loggedOut",
        LOGIN_STATE: "app/login",
        LOGOUT_STATE: "app/logout",
        SET_LOCATION: "location/model:setLocation",
        SET_WEATHER: "weather/model:setWeather",
        SET_WEATHER_DATE: "weather/model:setWeatherDate"
    },

    URL: {
        LOGIN_WEBSERVICE: "http://localhost:3000/",
        WEATHER_WEBSERVICE: "http://localhost:3000/",
        LOCATION_WEBSERVICE: "http://ip-api.com/json"
    }
};

