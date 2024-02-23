import axios from "axios";

const deleteAccount = async (id: number, username: string, email: string, password: string, token: string | null) => {
  try {
    const data = {id, username, email, password}
    const response = await axios.post('http://localhost:3001/auth/delete-account', data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default deleteAccount;