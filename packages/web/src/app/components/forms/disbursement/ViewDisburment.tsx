import { useRouter } from 'next/navigation'
import Modal from '../../modal/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Movement } from '@/lib/utils/accounting/types'
import { useState } from 'react'
import TableDisbursementsDetails from './TableDisbursementDetails'
import { Token } from '@/app/hooks/TokenContext'
const GET_Disbursements = gql`
  query FindDisbursementhByMovement($movement: String!) {
    findDisbursementhByMovement(movement: $movement) {
      __typename
      ... on typeCredit {
        id
        identification
        lastName
        name
        creditValue
        valuePrevius
        interest
        nameCredit
        state
        discountDate
        startDate
      }
      ... on MovementOutput {
        id_note
        date
        concept
      }
    }
  }
`

function ViewDisbursement({
  idMovement,
  setView
}: {
  idMovement: string
  setView: any
}) {
  const { context } = Token()
  const { data, loading, error } = useQuery(GET_Disbursements, {
    variables: { movement: idMovement },
    context
  })

  return (
    <>
      <Modal
        size=" lg:h-auto lg:w-[1000px] bg-white"
        title="Comprobantes de egreso"
        onClick={() => {
          setView(false)
        }}
      >
        {data && (
          <>
            <TableDisbursementsDetails
              disbursements={data.findDisbursementhByMovement}
            />
          </>
        )}
      </Modal>
    </>
  )
}

export default ViewDisbursement
