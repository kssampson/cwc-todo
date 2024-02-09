
const checkCreateUserErrors = async (usernameError: boolean, emailError: boolean, passwordError: boolean) => {
  console.log(usernameError, emailError, passwordError)
  if (usernameError === false || emailError === false || passwordError === false) {
    return false;
  }
  return true;
}

export default checkCreateUserErrors;