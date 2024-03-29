import axios from "axios";

const DeleteSubTaskItem = async (subTaskId: number, itemId: number, token: string | null) => {
  console.log(subTaskId, itemId, token)
  try {
    const response = await axios.delete('http://localhost:3001/auth/delete-sub-task-item', {
      headers: { Authorization: `Bearer ${token}` },
      data: {subTaskId: subTaskId, itemId: itemId}
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default DeleteSubTaskItem;