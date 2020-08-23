export function onError(error) {
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }
  // message === "User does not exist." ? alert(message) : alert(message);
  return message;
}
