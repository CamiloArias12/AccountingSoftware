'use client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Chart, Line } from 'react-chartjs-2'
import ReactApexChart from 'react-apexcharts'
ChartJS.register(...registerables)

export function StatisticsContributionChart({ values }: { values: any }) {
  console.log(values)
  const [array, setArray] = useState()
  useEffect(() => {
    setArray(values.map(value => [value[0], value[1]]))
  }, [])

  console.log(array)

  const state = {
    series: [
      {
        name: 'Aportes',
        data: array
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
            borderColor: '#999',
            label: {
              show: true,
              text: 'Support',
              style: {
                color: '#fff',
                background: '#00E396'
              }
            }
          }
        ],
        xaxis: [
          {
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Rally',
              style: {
                color: '#fff',
                background: '#775DD0'
              }
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },

      markers: {
        size: 0,
        style: 'hollow'
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: 'MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    },

    selection: 'all'
  }
  return (
    <div className="flex  flex-grow flex-col gap-4 rounded-lg overflow-scroll bg-[#f5f5fb]  w-screen sm:w-full p-4 md:bg-white  ">
      <div className="flex flex-grow  flex-row justify-between font-bold text-md pb-2 border-b-2 text-gray-400">
        <span>Aportes</span>
        <span>
          {`$ ${values
            .reduce((acum: number, value: any) => {
              return acum + value[1]
            }, 0)
            .toLocaleString()}`}
        </span>
      </div>
      <div className="w-full flex overflow-hidden  flex-col items-center justify-center ">
        <ReactApexChart
          //@ts-ignore
          options={state.options}
          series={state.series}
          type="area"
          height={350}
          width={400}
        />
      </div>
    </div>
  )
}
