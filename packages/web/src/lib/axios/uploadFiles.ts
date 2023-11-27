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


export async function downloadPuc(): Promise<Boolean> {
  try {
    const respose = await axios({
      method: 'get',
      url: `${process.env.API_ENDPOINT}/type-account/download`,
      responseType:'blob'
    });
    const url=window.URL.createObjectURL(new Blob([respose.data]))
    const link=document.createElement('a')
    link.href=url
    link.setAttribute('download',"puc.xlsx")
    link.click()
    document.body.removeChild(link)
    return respose.data;
  } catch (error) {
    return false;
  }
}



export async function downloadCreditPdf(id:number): Promise<Boolean> {
  try {
    const respose = await axios({
      method: 'get',
      url: `${process.env.API_ENDPOINT}/credit/download-pdf/${id}`,
      responseType:'arraybuffer'
    });
    console.log("download",respose.data)
        const buffer = Buffer.from(respose.data, 'binary');
	console.log(buffer)
	const blob=new Blob([buffer],{type:'application/octet-stream'})
	console.log(blob)
    const url=window.URL.createObjectURL(blob)
    const link=document.createElement('a')
    link.href=url
    link.setAttribute('download',"credit.pdf")
    link.click()
    document.body.removeChild(link)
    return respose.data;
  } catch (error) {
    return false;
  }
}

export async function downloadCreditXlsx(id:number): Promise<Boolean> {
  try {
    const respose = await axios({
      method: 'get',
      url: `${process.env.API_ENDPOINT}/credit/download-xlsx/${id}`,
      responseType:'arraybuffer'
    });
    console.log("download",respose.data)
        const buffer = Buffer.from(respose.data, 'binary');
	console.log(buffer)
	const blob=new Blob([buffer],{type:'application/octet-stream'})
	console.log(blob)
    const url=window.URL.createObjectURL(blob)
    const link=document.createElement('a')
    link.href=url
    link.setAttribute('download',"credit.xlsx")
    link.click()
    document.body.removeChild(link)
    return respose.data;
  } catch (error) {
    return false;
  }
}




