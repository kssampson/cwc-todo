import axios from "axios";

const updateSubTaskDescription = async (taskId: number, subTaskId: number, newValue: string, token: string | null) => {
  const submissionData = {taskId, subTaskId, newValue, token}
  try {
    const response = await axios.patch('http://localhost:3001/auth/edit-sub-task-description', submissionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default updateSubTaskDescription;