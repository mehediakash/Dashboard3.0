function NumberValidation(number) {
  if (!number) {
    return false;
  }
  let partern = /^(?:(?:\+|00)88|01)?\d{11}$/;
  const result = partern.test(number);
  if (!result) {
    return false;
  }
  return true;
}

module.exports = NumberValidation;
