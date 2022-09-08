function validationPassword(password) {
  const min = 6;
  const passwordSize = password.length;
  return passwordSize >= min;
}

export default validationPassword;
