class ApiError extends Error {
  constructor(
    message = "something went wrong",
    statusCode = 500,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.success = false;
  }
};

export { ApiError };