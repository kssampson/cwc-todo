import axios from "axios";

const editAccountDetails = async (submissionData: object, accessToken: string | null) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/edit-account', submissionData, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    console.log('response', response.data)
    return response.data
  } catch (error) {
    console.log('error in editAccountsDetails: ', error)
    throw error
  }
}

export default editAccountDetails;