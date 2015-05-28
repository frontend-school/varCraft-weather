
window.vCWeather = window.vCWeather || {};
window.vCWeather.CONST = {
    ONE_MINUTE_MS: 60 * 1000,
    //ONE_HOUR_MS: 24 * 60 * 60 * 1000,
    CLASSES_LOGGING: {
        TO_SHOW_BLOCK: 'popup__overlay_show-block',
        TO_HIDE_BLOCK: 'popup__overlay_hide-block',
    },
    CLASSES_LOGGING_CONTROLS: {
        //LOG_IN: 'js-log-in',
        LOG_OUT: '.js-log-out',
        LOGGING_FORM: '.js-login-form',
        LOGGING_NAME: '.js-login-name',
        LOGGING_PASSWORD: '.js-login-password',
        HALLO_MESSAGE: '.js-hallo-message'
    },
    TIMER: {
        TIME_OFF_LIMIT: 30 * 60 * 1000,
        TIME_DELTA_OFF: 30 * 1000
    },
    CLASSES_DAY_TIME: {
        TIME: '.js-time',
        TIME_PERIOD: '.js-time-period',
        DAY: '.js-day',
        DAY_LIST: {
            DATE_YESTERDAY: '.js-date-yesterday',
            DATE_TODAY: '.js-date-today',
            DATE_TOMORROW: '.js-date-tomorrow'
        }
    },
    SERVER: {
        ADDRESS: 'http://localhost:3000'
    },
    CLASSES_LOCATION: {
        CITY: '.js-city',
        COUNTRY: '.js-country'
    },
    LOCATION_SERVICE_ADDR: 'http://ip-api.com/json',
    WEATHER: {
        CLASSES_DAY_LIST: {
            DAY_YESTERDAY: '.js-day-yesterday',
            DAY_TODAY: '.js-day-today',
            DAY_TOMORROW: '.js-day-tomorrow'
        },
        CLASSES_WEATHER_DATA: {
            DAY_HEADER: '.js-day-header', // Today in Kiev
            DAY_DATE: '.js-day-date',
            TEMPERATURE_DAY: '.js-temperature-day',
            TEMPERATURE_NIGHT: '.js-temperature-night',
            STATUS: '.js-status',
            HUMIDITY_SCHEME: '.js-humidity-scheme',
            HUMIDITY_VALUE: '.js-humidity-value',
            WIND_SPEED: '.js-wind-speed',
            WIND_DIRECTION: '.js-wind-direction',
            WIND_SCHEME: '.js-wind-scheme',
            MOON_SCHEME: '.js-moon-scheme'
        },
        CLASSES_WEATHER_STATUS_MODIFICATORS: {
            'Snowfall': 'status-weather_icon-snowfall',
            'Snow': 'status-weather_icon-snow',
            'Sleet': 'status-weather_icon-sleet',
            'Mostly Cloudly': 'status-weather_icon-mostly-cloudly',
            'Partly Cloudly': 'status-weather_icon-partly-cloudly',
            'Fog': 'status-weather_icon-fog',
            'Sunny': 'status-weather_icon-sunny',
            'Rain and Sun': 'status-weather_icon-rain-and-sun',
            'Light Rain': 'status-weather_icon-light-rain',
            'Rain': 'status-weather_icon-rain',
            'Downpour': 'status-weather_icon-downpour',
            'Lightning Storm': 'status-weather_icon-lightning-storm',
            'Hurricane': 'status-weather_icon-hurricane',
            'Error': 'status-weather_icon-error'
        },
        CLASSES_DAY_COLOR_MODIFICATORS: {
            'Snowfall': 'day_snowfall',
            'Snow': 'day_snow',
            'Sleet': 'day_sleet',
            'Mostly Cloudly': 'day_mostly-cloudly',
            'Partly Cloudly': 'day_partly-cloudly',
            'Fog': 'day_fog',
            'Sunny': 'day_sunny',
            'Rain and Sun': 'day_rain-and-sun',
            'Light Rain': 'day_light-rain',
            'Rain': 'day_rain',
            'Downpour': 'day_downpour',
            'Lightning Storm': 'day_lightning-storm',
            'Hurricane': 'day_hurricane',
            'Error': 'day_error'
        },
        CLASSES_HUMIDITY_MODIFICATORS: {
            low: 'params-humidity__scheme_low',
            medium: 'params-humidity__scheme_medium',
            high: 'params-humidity__scheme_high'
        },
        CLASSES_MOON_MODIFICATORS: {
            'new moon': 'params-moon__scheme_new-moon',
            'waxing crescent': 'params-moon__scheme_waxing-crescent',
            'first quarter': 'params-moon__scheme_first-quater',
            'waxing gibbous': 'params-moon__scheme_waxing-gibbous',
            'full moon': 'params-moon__scheme_full-moon',
            'waning gibbous': 'params-moon__scheme_waning-gibbous',
            'last quarter': 'params-moon__scheme_last-quater',
            'waning crescent': 'params-moon__scheme_waning-crescent'
        },
        CLASSES_WIND_DIRECTION_MODIFICATORS: {
            'S': 'params-wind__scheme_S',
            'N': 'params-wind__scheme_N',
            'E': 'params-wind__scheme_E',
            'W': 'params-wind__scheme_W',
            'SE': 'params-wind__scheme_SE',
            'SW': 'params-wind__scheme_SW',
            'NE': 'params-wind__scheme_NE',
            'NW': 'params-wind__scheme_NW'
        },
        WIND_SPEED_SCALE: 'mph'
    },
    MOBILE_CONTROL: {
        CLASS_OUT_OF_SCREEN: 'day_out-of-screen',
        CLASS_MOVE_LEFT: '.js-move-left',
        CLASS_MOVE_RIGHT: '.js-move-right'
    }
};