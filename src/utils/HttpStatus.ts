const HttpStatus = {
    NOT_STARTED: 0,
    WAITING: 1,
    ON_REQUEST_ERROR: 2,
    requestError: function (status: number): boolean {
        return status === this.ON_REQUEST_ERROR || (status >= 400 && status < 500);
    },
    serverError: function (status: number): boolean {
        return status >= 500 && status < 600;
    },
    anyError: function (status: number): boolean {
        return this.requestError(status) || this.serverError(status);
    },
    waiting: function (status: Array<number> | number): boolean {
        if (Array.isArray(status)) return status.some(status => status === this.WAITING)
        else return status === this.WAITING;
    },
    done: function (status: Array<number> | number): boolean {
        if (Array.isArray(status)) return status.some(status => status === 200);
        return status === 200;
    }
}

export default HttpStatus;