

const isValidEmail = (email: string) => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email.match(emailFormat) && email.length > 0 ? true : false;
}

export default isValidEmail;