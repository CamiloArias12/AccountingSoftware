import { useRouter } from 'next/navigation'
import Modal from '../../modal/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import TableMovementsAccount from './TableMovementsAccount'
import { Movement } from '@/lib/utils/accounting/types'
import TableMovementsDetails from './TableMovementsDetails'
import TableMovements from './TableMovements'
import { useState } from 'react'
import Button from '../../input/Button'
import Image from 'next/image'
import { downloadAccountMovementPdf } from '@/lib/axios/uploadFiles'
const GET_ACCOUNT_MOVEMENT = gql`
  query ($movements: [String!]!) {
    findMovementAccount(movements: $movements) {
      account {
        credit
        debit
        identificationThird
        nameThird
        code
        nameAccount
      }
      movement {
        id
        date
        concept
        state
        accounting
      }
    }
  }
`

function ViewMovementAccount({
  setView,
  movements
}: {
  movements: any
  setView: any
}) {
  console.log(movements)
  const { data, loading, error } = useQuery(GET_ACCOUNT_MOVEMENT, {
    variables: { movements: movements }
  })
  const [index, setIndex] = useState(0)
  const [loadingDownload, setLoadingDownload] = useState(false)
  return (
    <>
      <Modal
        size="max-w-[1000px] h-[800px] bg-white"
        title="Movimiento cuentas"
        onClick={() => {
          setView(false)
        }}
      >
        {data && (
          <>
            <Button
              background="bg-[#EEEEEE] rounded-lg "
              image="/download.svg"
              name="Descargar"
              loading={loadingDownload}
              onClick={async () => {
                setLoadingDownload(true)
                await downloadAccountMovementPdf(
                  data?.findMovementAccount[index].movement.id
                )

                setLoadingDownload(false)
              }}
            />

            <TableMovementsDetails
              movements={[data?.findMovementAccount[index].movement]}
            />
            <TableMovementsAccount
              movementAccounts={data?.findMovementAccount[index].account}
            />
            {index > 0 && (
              <div className="pr-4">
                <Button
                  name="Anterior"
                  background="border border-[#009226] text-[#009226]"
                  type={'submit'}
                  onClick={() => {
                    setIndex(index - 1)
                  }}
                />
              </div>
            )}
            {index < data?.findMovementAccount.length - 1 && (
              <div className="pr-4">
                <Button
                  name="Siguiente"
                  background="border border-[#009226] text-[#009226]"
                  type={'submit'}
                  onClick={() => {
                    setIndex(index + 1)
                  }}
                />
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  )
}

export default ViewMovementAccount
