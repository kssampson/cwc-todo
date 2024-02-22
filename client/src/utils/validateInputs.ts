

const isValidEmail = (email: string) => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email.match(emailFormat) && email.length > 0 ? true : false;
}

const isValidName = (name: string) => {
  return name.length > 0 ? true : false;
}

const isValidPassword = (password: string) => {
  // console.log('current password in validateInputs: ', password)
  return password.length >= 8 ? true : false;
}

const isValidSecondPassword = (password: string, secondPassword: string) => {
  // console.log('password 1 in validateSecondPassword: ', password)
  // console.log('password 2 in validateSecondPassword: ', secondPassword)

  return password === secondPassword && isValidPassword(secondPassword) ? true : false;
}

export const validateInputs = { isValidEmail, isValidName, isValidPassword, isValidSecondPassword };