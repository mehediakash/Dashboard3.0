function EmailValidation(email) {
  if (!email) {
    return false;
  }
  let partern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let result = partern.test(email);
  if (!result) {
    return false;
  }
  return true;
}

module.exports = EmailValidation;
