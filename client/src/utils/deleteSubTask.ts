import axios from "axios";

const DeleteSubTask = async (taskId: number, subTaskId: number, token: string | null) => {
  try {
    const response = await axios.delete('http://localhost:3001/auth/delete-sub-task', {
      headers: { Authorization: `Bearer ${token}` },
      data: {taskId: taskId, subTaskId: subTaskId}
    })
    return response.data
  } catch (error) {
    return error;
  }
}

export default DeleteSubTask;