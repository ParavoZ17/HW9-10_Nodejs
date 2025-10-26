const messageList = {
  400: "Bad request",
  401: "Unauthorised",
  403: "Forbiden",
  404: "Not found",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

export default HttpError;
