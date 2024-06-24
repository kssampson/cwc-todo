import axios from "axios";

const creatSubTask = async (submissionData: object, token: string | null) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/create-sub-task', submissionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default creatSubTask;