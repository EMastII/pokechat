class NotFoundError extends Error {
  constructor(message = "Route not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export default NotFoundError;
