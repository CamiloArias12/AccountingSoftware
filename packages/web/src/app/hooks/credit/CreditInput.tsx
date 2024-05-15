import { useState } from 'react'

export function useCredit() {
  const [credit, setCredit] = useState({
    nameAffiliate: '',
    identification: '',
    creditValue: '',
    typeCredit: '',
    startDate: new Date(),
    discountDate: new Date(),
    interest: '',
    interestAnual: '',
    installments: '',
    scheduledPayment: '',
    idTypeCredit: '',
    previewBalance: '',
    newBalance: '',
    concept: '',
    methodPayment: ''
  })

  const handleCredit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setCredit(prevData => ({ ...prevData, [name]: value }))
  }
  const handleCreditSelect = (name: string, value: any) => {
    console.log(name, value)
    setCredit(prevData => ({ ...prevData, [name]: value }))
  }

  const handleCreditNumber = (name: string, value: any) => {
    if (!isNaN(Number(value))) {
      setCredit(prevData => ({ ...prevData, [name]: Number(value) }))
      if (name === 'newBalance' || name === 'previewBalance') {
        setCredit({
          ...credit,
          //@ts-ignore
          creditValue: Number(credit.previewBalance) + Number(credit.newBalance)
        })
      }

      return true
    }
    return false
  }

  return {
    credit,
    handleCredit,
    handleCreditSelect,
    handleCreditNumber,
    setCredit
  }
}
