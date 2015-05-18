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
        DATE: ".js-date"
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
        LOGOUT_STATE: "app/logout"
    },

    URL: {
        LOGIN_WEBSERVICE: "http://localhost:3000/",
        WEATHER_WEBSERVICE: "http://localhost:3000/"
    }
};

