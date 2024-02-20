import axios from "axios";

const editAccountDetails = async (submissionData: object, accessToken: string | null) => {
  // console.log('submissionData in editAccountDetails: ', submissionData)
  try {
    await axios.patch('http://localhost:3001/auth/edit-account', {submissionData: submissionData}, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  } catch (error) {
    console.log('error in editAccountsDetails: ', error)
  }
}

export default editAccountDetails;