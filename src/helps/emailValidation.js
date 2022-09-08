function validateEmail(email) {
  const rejex = /\S+@\S+\.\S+/;
  return rejex.test(email);
}

export default validateEmail;
