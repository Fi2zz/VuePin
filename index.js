function login() {}
function promiseRequest() {}

function request(options) {
  if (isLoggingIn) {
    return;
  }

  if (needLogin) {
    return login().then(() => promiseRequest(options));
  }
  return promiseRequest(options);
}
