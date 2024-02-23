import axios from 'axios';

const saveResetPassword = async (data: object) => {
  console.log("data in axios call: ", data)
  try {
    await axios.post('http://localhost:3001/auth/save-reset-password', data);
  } catch(error) {
    console.log('Failed on front end: ', error)
    return error;
  }
}

export default saveResetPassword;