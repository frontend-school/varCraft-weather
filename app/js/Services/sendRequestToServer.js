
(function (namespace) {
    function sendRequestToServer(address, params, successCallback, errorCallback) {
        var request = new XMLHttpRequest();

        var paramsInString = '';

        params = params || {};
        for (var paramKey in params) {
            paramsInString = paramsInString + /*( (paramsInString === '') ? '' : '&') +*/
                '&' + paramKey + '=' + params[paramKey];
        }
        paramsInString = paramsInString.replace("&","?"); // first match only

        request.open('GET', address + paramsInString, true);
        request.onreadystatechange = processReqChange;
        request.send();

        function processReqChange() {
            //try {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log('Your request: ', request);

                    successCallback(request.responseText);
                } else {
                    console.log('Getting data failed: ' + request.statusText);

                    if (errorCallback) {
                        errorCallback();
                    }
                }
            }
            //}
            //catch( e ) {
            //    alert('Error: ' + e.description);
            //
            //    console.log(e);
            //}
        }
    }

    namespace.services.sendRequestToServer = sendRequestToServer;
})(window.vCWeather);
