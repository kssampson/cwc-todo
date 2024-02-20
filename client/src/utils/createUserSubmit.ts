import axios from 'axios';

const createUserSubmit = async (userData: object) => {
  console.log('userData in createUserSubmit: ', userData)
  try {
    await axios.post('http://localhost:3001/auth/register', userData);
  } catch(error) {
    console.log('Failed on front end: ', error)
  }
}

export default createUserSubmit;