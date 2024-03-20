import { useState } from 'react'
import Modal from '../../modal/Modal'
import Button from '../../input/Button'
import { uploadFileAccounts } from '@/lib/axios/uploadFiles'
import { useRouter } from 'next/navigation'
import { Token } from '@/app/hooks/TokenContext'

function UploadAccounts({ setShowModal }: { setShowModal: any }) {
  const [file, setFile] = useState(null)
  const route = useRouter()
  const fileHandle = (event: any) => {
    setFile(event.target.files[0])
  }
  const { context } = Token()
  const uploadFile = async () => {
    const formData = new FormData()
    //@ts-ignore
    formData.append('file', file)
    const response: Boolean = await uploadFileAccounts(
      formData,
      context.headers.Authorization
    )
    console.log(response)
    route.refresh()
  }

  return (
    <Modal
      size="md:h-[500px] md:w-[500px] bg-white"
      title="Cargar plan de cuentas"
      onClick={() => {
        setShowModal(false)
      }}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <input type="file" onChange={fileHandle} />
        <Button
          name="Cargar"
          background="bg-[#10417B] text-white"
          onClick={() => {
            uploadFile()
          }}
        />
      </div>
    </Modal>
  )
}

export default UploadAccounts
