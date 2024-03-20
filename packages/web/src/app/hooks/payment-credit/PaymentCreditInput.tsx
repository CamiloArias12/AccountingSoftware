import { useState } from 'react'

export function usePaymentCredit() {
  //@ts-ignore
  const [paymentCredit, setPaymentCredit] = useState({
    idAccount: '',
    user: '',
    company: '',
    concept: '',
    date: new Date(),
    nature: ''
  })

  const handlePaymentCredit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setPaymentCredit(prevData => ({ ...prevData, [name]: value }))
  }
  const handlePaymentCreditSelect = (name: string, value: any) => {
    console.log(name, value)
    setPaymentCredit(prevData => ({ ...prevData, [name]: value }))
  }

  return {
    paymentCredit,
    handlePaymentCredit,
    handlePaymentCreditSelect,
    setPaymentCredit
  }
}
