import axios from 'axios';

export async function uploadFileAccounts(formData: FormData): Promise<Boolean> {
  try {
    const respose = await axios({
      method: 'post',
      url: `${process.env.API_ENDPOINT}/type-account/upload`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return respose.data;
  } catch (error) {
    return false;
  }
}
