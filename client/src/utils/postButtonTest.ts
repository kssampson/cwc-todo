import axios from 'axios';

const postButtonTest = async (userData: object) => {
  try {
    const response = await axios.post('http://localhost:3001/user', userData);
    console.log(response);
  } catch {
    console.log('Failed on front end')
  }
}

export default postButtonTest;