class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest = (message) => new ApiError(404, message)
    static internal = (message) => new ApiError(500, message)
    static forbidden = (message) => new ApiError(403, message)
}

module.exports = ApiError;