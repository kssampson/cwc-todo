import axios from "axios";

const login = async (userData: object) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', userData)
    return response.data.accessToken;
  } catch(error){
    console.log('Failed on front end: ', error)
  }
}

export default login