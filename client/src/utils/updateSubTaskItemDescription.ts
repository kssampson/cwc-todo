import axios from "axios";

const updateSubTaskItemDescription = async (subTaskId: number, itemId: number, newValue: string, token: string | null) => {
  const submissionData = {subTaskId, itemId, newValue, token}
  try {
    const response = await axios.patch('http://localhost:3001/auth/edit-item-description', submissionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default updateSubTaskItemDescription;