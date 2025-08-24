class ApiResponse {
  constructor(data=null, message, statusCode) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode < 400;
  }
}

export { ApiResponse };
