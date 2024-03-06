import axios from "axios";

const createTask = async (submissionData: object, token: string | null) => {
  console.log('submissionData in createTask.ts: ', submissionData)
  console.log('token in createTask.ts: ', token)
  try {
    const response = await axios.post('http://localhost:3001/auth/create-tasks', submissionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default createTask;