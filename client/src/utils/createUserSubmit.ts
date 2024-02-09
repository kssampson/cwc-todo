import axios from 'axios';

const createUserSubmit = async (userData: object) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/register', userData);
    console.log(response);
  } catch {
    console.log('Failed on front end')
  }
}

export default createUserSubmit;