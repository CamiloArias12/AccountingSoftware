import Modal from '../../modal/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import TableCashDetails from './TableCashDetails'
import { Token } from '@/app/hooks/TokenContext'
const GET_DEFERRED = gql`
  query FindCashByMovement($movement: String!) {
    findCashByMovement(movement: $movement) {
      __typename
      ... on SavingOut {
        name
        lastName
        saving
        qoutaValue
        year
        month
      }
      ... on CashPaymentCredit {
        identification
        name
        lastName
        paymentDate
        interest
        installmentNumber
        credit
        interestPayment
        capital
        isDeferred
      }
      ... on MovementOutput {
        id
        date
        concept
      }
    }
  }
`

function ViewCashDetails({
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

  return (
    <>
      <Modal
        size=" lg:h-auto lg:w-[1000px] bg-white"
        title="Recibos de caja"
        onClick={() => {
          setView(false)
        }}
      >
        {data && (
          <>
            <TableCashDetails cashs={data.findCashByMovement} />
          </>
        )}
      </Modal>
    </>
  )
}

export default ViewCashDetails
