import axios from "axios";

const creatSubTaskItem = async (submissionData: object, token: string | null) => {
  // console.log('submissionData in creatSubTask.ts: ', submissionData)
  // console.log('token in creatSubTask.ts: ', token)
  try {
    const response = await axios.post('http://localhost:3001/auth/create-sub-task-item', submissionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default creatSubTaskItem;