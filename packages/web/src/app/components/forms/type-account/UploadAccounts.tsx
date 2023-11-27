import { useState } from 'react'
import Modal from '../../modal/Modal'
import Button from '../../input/Button'
import { uploadFileAccounts } from '@/lib/axios/uploadFiles'
import { useRouter } from 'next/navigation'

function UploadAccounts({ setShowModal }: { setShowModal: any }) {
  const [file, setFile] = useState(null)
  const route = useRouter()
  const fileHandle = (event: any) => {
    setFile(event.target.files[0])
  }

  const uploadFile = async () => {
    const formData = new FormData()
    //@ts-ignore
    formData.append('file', file)
    const response: Boolean = await uploadFileAccounts(formData)
    console.log(response)
    route.refresh()
  }

  return (
    <Modal
      size="h-[500px] w-[500px]"
      title="Cargar plan de cuentas"
      onClick={() => {
        setShowModal(false)
      }}
    >
      <div>
        <input type="file" onChange={fileHandle} />
        <Button
          name="Cargar"
          background=""
          onClick={() => {
            uploadFile()
          }}
        />
      </div>
    </Modal>
  )
}

export default UploadAccounts
