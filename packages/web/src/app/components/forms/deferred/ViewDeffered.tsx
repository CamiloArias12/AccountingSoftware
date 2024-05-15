import { useRouter } from 'next/navigation'
import Modal from '../../modal/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Movement } from '@/lib/utils/accounting/types'
import TableDeferredDetails from './TableDeferredDetails'
import { useState } from 'react'
import { Token } from '@/app/hooks/TokenContext'
const GET_DEFERRED = gql`
  query ($movement: String!) {
    findDeferredByMovement(movement: $movement) {
      __typename
      ... on CreditPaymentOut {
        name
        lastName
        paymentDate
        interest
        installmentNumber
        credit
        interestPayment
      }
      ... on SavingOut {
        name
        lastName
        saving
        qoutaValue
        year
        month
      }
    }
  }
`

function ViewDefferedDetails({
  idMovement,
  setView
}: {
  idMovement: string
  setView: any
}) {
  const { context } = Token()
  const { data, loading, error } = useQuery(GET_DEFERRED, {
    variables: { movement: idMovement },
    context
  })

  console.log(data)
  return (
    <>
      <Modal
        size=" lg:h-auto lg:w-[1000px] bg-white"
        title="Diferido "
        onClick={() => {
          setView(false)
        }}
      >
        {data && (
          <TableDeferredDetails deferreds={data.findDeferredByMovement} />
        )}
      </Modal>
    </>
  )
}

export default ViewDefferedDetails
