class ApiResponse {
  constructor(statusCode, message, data = "Success") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode< 400; // Assuming status codes below 400 are successful
  }
  }
  

