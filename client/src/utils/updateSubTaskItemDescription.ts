import axios from "axios";

const updateSubTaskItemDescription = async (subTaskItemDescription: string, taskId: number, subTaskId: number, subTaskItemId: number, newValue: string, token: string | null) => {
  const submissionData = {subTaskItemDescription, taskId, subTaskId, subTaskItemId, newValue, token}
  try {
    // console.log(submissionData)
    // const response = await axios.patch('http://localhost:3001/auth/edit-sub-task-item-description', submissionData, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    // return response.data
  } catch (error) {
    return error;
  }
}

export default updateSubTaskItemDescription;