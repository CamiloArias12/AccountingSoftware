import { useQuery, gql } from '@apollo/client'
import Modal from '../../modal/Modal'
import SplashScreen from '../../splash/Splash'

const GET_CREDIT = gql`
  query getCredit($id: Int!) {
    findOneCredit(id: $id) {
      id
      creditValue
      interest
      startDate
      discountDate
      state
      affiliate {
        user {
          identification
          name
          lastName
        }
      }
      installments {
        installmentNumber
        credit_id
        paymentDate
        initialBalance
        scheduledPayment
        extraPayment
        totalPayment
        capital
        interest
        finalBalance
        isPay
      }
    }
  }
`

function ViewThird({
  thirdIdentification,
  setShow
}: {
  thirdIdentification: number
  setShow: any
}) {
  const { data, loading, error } = useQuery(GET_CREDIT, {
    variables: { id: thirdIdentification }
  })

  if (error) {
    return (
      <Modal
        size="h-[100px] w-[300px]"
        title="Error"
        onClick={() => setShow(false)}
      >
        HJ
      </Modal>
    )
  }
  return (
    <Modal
      size="h-[90%] w-[90%]"
      title="Tercero"
      onClick={() => setShow(false)}
    >
      <>{loading && <SplashScreen />}</>
    </Modal>
  )
}

export default ViewThird
