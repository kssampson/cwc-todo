
const checkCreateUserErrors = async (usernameError: boolean, emailError: boolean, passwordError: boolean) => {
  if (usernameError === false || emailError === false || passwordError === false) {
    return false;
  }
  return true;
}

export default checkCreateUserErrors;