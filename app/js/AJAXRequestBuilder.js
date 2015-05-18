function AJAXRequest(method, url, async) {
    this.request = new XMLHttpRequest();
    this.method = method;
    this.url = url;
    this.async = async;
}

AJAXRequest.prototype.setGetParams = function (params) {
    var pairs = [];

    for (var key in params) {
        if (!params.hasOwnProperty(key)) {
            continue;
        }
        var pair = encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toString());
        pairs.push(pair);
    }

    this.queryGetParams = '?' + pairs.join('&');
};


AJAXRequest.prototype.send = function (successCallback, errorCallback) {
    this.request.open(this.method, this.url + (this.queryGetParams || ''), this.async);
    this.request.send();
    var self = this;
    if (!this.async) {
        if (this.request.status === 200) {
            successCallback(this.request.responseText);
        }
        else {
            errorCallback(this.request.response);
        }
    }
    else {
        this.request.onreadystatechange = function () {
            if (self.request.readyState !== 4) {
                return;
            }

            if (self.request.status === 200) {
                successCallback(self.request.responseText);
            }
            else {
                errorCallback(self.request.response);
            }
        };
    }
};
