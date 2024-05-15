'use client'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Chart, Line } from 'react-chartjs-2'
import ReactApexChart from 'react-apexcharts'
ChartJS.register(...registerables)

export function StatisticsCountCreditChart({ values }: { values: any }) {
  console.log(values)
  const [array, setArray] = useState()
  useEffect(() => {
    setArray(values.map(value => [value[0], value[1]]))
  }, [])

  console.log(array)

  const state = {
    series: [
      {
        name: 'Creditos',
        data: array
      }
    ],
    options: {
      colors: ['#1488dc'],
      chart: {
        id: 'area-datetime',
        type: 'bar',
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
      dataLabels: {},
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
      }
    },

    selection: 'all'
  }
  return (
    <ReactApexChart
      //@ts-ignore
      options={state.options}
      series={state.series}
      type="bar"
      height={300}
      width={'100%'}
    />
  )
}
