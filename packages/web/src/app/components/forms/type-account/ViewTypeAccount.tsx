import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import Modal from '../../modal/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import ReactApexChart from 'react-apexcharts'
import { LabelView } from '../../input/LabelView'
import { Token } from '@/app/hooks/TokenContext'
ChartJS.register(...registerables)

const GET_ACCOUNT_STATISTICS = gql`
  query StatisticsAccount($code: Int!, $type: String!) {
    statisticsAccount(code: $code, type: $type) {
      credit
      debit
      date
    }
  }
`

function ViewTypeAccount({
  typeAccountSelected,
  values,
  setView
}: {
  typeAccountSelected: number
  values: any
  setView: any
}) {
  const { context } = Token()
  const { data, error, loading, refetch } = useQuery(GET_ACCOUNT_STATISTICS, {
    variables: { code: typeAccountSelected, type: values.type },
    context
  })
  console.log(data)
  const [array, setArray] = useState([])
  const [array2, setArray2] = useState([])
  useEffect(() => {
    setArray2([])
    setArray([])
    if (data) {
      data.statisticsAccount.map(value => {
        value.debit !== 0 &&
          setArray(previus => [
            ...previus,
            [new Date(value.date).getTime(), Number(value.debit)]
          ])
      })
      data.statisticsAccount.map(value => {
        value.credit !== 0 &&
          setArray2(previus => [
            ...previus,
            [new Date(value.date).getTime(), Number(value.credit)]
          ])
      })
    }
  }, [data])

  const state = {
    series: [
      {
        name: 'Debito',
        data: array
      },
      {
        name: 'Credito',
        data: array2
      }
    ],
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,

        zoom: {
          autoScaleYaxis: true
        }
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: '#999'
          }
        ],
        xaxis: [
          {
            borderColor: '#999'
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        colors: undefined,
        strokeColors: '#fff',
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'circle',
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 3
        }
      },

      xaxis: {
        type: 'datetime',
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'image'
      }
    },

    selection: 'all'
  }
  console.log(array, array2)
  return (
    <>
      <Modal
        size="  md:h-auto bg-white md:min-w-[550px]  md:w-[600px]"
        title="Cuenta"
        onClick={() => {
          setView(false)
        }}
      >
        <div className="grid grid-cols-2">
          <LabelView value={values.type} name="Tipo" />
          <LabelView value={values.typeAccount_code} name="Código" />
          <LabelView value={values.typeAccount_name} name="Nombre" />
          <LabelView value={values.typeAccount_nature} name="Naturaleza" />
          <LabelView
            value={`$ ${data?.statisticsAccount
              .reduce((acum: number, value: any) => {
                return acum + value.debit
              }, 0)
              .toLocaleString()}`}
            name="Total debito"
          />
          <LabelView
            value={`$ ${data?.statisticsAccount
              .reduce((acum: number, value: any) => {
                return acum + value.credit
              }, 0)
              .toLocaleString()}`}
            name="Total crédito"
          />
        </div>
        <section className="App  flex overflow-scroll flex-col items-center justify-center ">
          <ReactApexChart
            //@ts-ignore
            options={state.options}
            series={state.series}
            type={'area'}
            height={350}
            width={500}
          />
        </section>
      </Modal>
    </>
  )
}

export default ViewTypeAccount
