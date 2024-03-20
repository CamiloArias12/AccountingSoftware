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
import { Token } from '@/app/hooks/TokenContext'
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
  const { context } = Token()
  const { data, loading, error } = useQuery(GET_ACCOUNT_MOVEMENT, {
    variables: { movements: movements },
    context
  })
  const [index, setIndex] = useState(0)
  const [loadingDownload, setLoadingDownload] = useState(false)
  return (
    <>
      <Modal
        size=" lg:h-auto lg:w-[1000px] bg-white"
        title="Movimiento cuentas"
        onClick={() => {
          setView(false)
        }}
      >
        {data && (
          <>
            <div className="flex flex-row p-2 w-full justify-between items-center bg-gray-100 shadow-inner mt-2 ">
              {index > 0 ? (
                <Button
                  name="Anterior"
                  image="/arrowLeft.svg"
                  background="shadow-sm rounded-xl bg-gray-200"
                  type={'submit'}
                  onClick={() => {
                    setIndex(index - 1)
                  }}
                />
              ) : (
                <div />
              )}

              <Button
                background="shadow-sm rounded-xl bg-gray-200"
                image="/download.svg"
                name="Descargar"
                loading={loadingDownload}
                onClick={async () => {
                  setLoadingDownload(true)
                  await downloadAccountMovementPdf(
                    data?.findMovementAccount[index].movement.id,
                    context.headers.Authorization
                  )

                  setLoadingDownload(false)
                }}
              />
              {index < data?.findMovementAccount.length - 1 ? (
                <Button
                  name="Siguiente"
                  image="/arrowRigth.svg"
                  background="shadow-sm rounded-xl bg-gray-200"
                  type={'submit'}
                  rigth
                  onClick={() => {
                    setIndex(index + 1)
                  }}
                />
              ) : (
                <div />
              )}
            </div>
            <div className="overflow-scroll flex flex-col ">
              <TableMovementsDetails
                movements={[data?.findMovementAccount[index].movement]}
              />
              <TableMovementsAccount
                movementAccounts={data?.findMovementAccount[index].account}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export default ViewMovementAccount
