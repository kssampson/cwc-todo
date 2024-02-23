import axios from 'axios';

const saveResetPassword = async (data: object) => {
  try {
    await axios.post('http://localhost:3001/auth/save-reset-password', data);
  } catch(error) {
    return error;
  }
}

export default saveResetPassword;