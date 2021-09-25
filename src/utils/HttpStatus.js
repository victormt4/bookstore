const HttpStatus = {
    NOT_STARTED: 0,
    WAITING: 1,
    ON_REQUEST_ERROR: 2,
    requestError: function (HttpStatus) {
        return HttpStatus === this.ON_REQUEST_ERROR || (HttpStatus >= 400 && HttpStatus < 500);
    },
    serverError: function (HttpStatus) {
        return HttpStatus >= 500 && HttpStatus < 600;
    },
    anyError: function (HttpStatus) {
        return this.requestError(HttpStatus) || this.serverError(HttpStatus);
    },
    waiting: function (HttpStatus) {
        if (Array.isArray(HttpStatus)) return HttpStatus.some(status => status === this.WAITING)
        else return HttpStatus === this.WAITING;
    },
    done: function (HttpStatus) {
        if (Array.isArray(HttpStatus)) return HttpStatus.some(status => status === 200);
        return HttpStatus === 200;
    }
}

export default HttpStatus;