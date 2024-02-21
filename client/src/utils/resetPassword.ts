import axios from "axios";

const resetPassword = async (email: string) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/reset-password', {email: email})
  } catch (error) {
    throw error
  }
}

export default resetPassword;