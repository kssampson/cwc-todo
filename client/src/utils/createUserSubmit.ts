import axios from 'axios';

const createUserSubmit = async (userData: object) => {
  try {
    await axios.post('http://localhost:3001/auth/register', userData);
  } catch(error) {
    throw error
  }
}

export default createUserSubmit;