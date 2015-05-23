
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
            DAY_YESTERDAY: '.js-day-yesterday',
            DAY_TODAY: '.js-day-today',
            DAY_TOMORROW: '.js-day-tomorrow'
        }
    },
    SERVER: {
        ADDRESS: 'http://localhost:3000'
    }
};
