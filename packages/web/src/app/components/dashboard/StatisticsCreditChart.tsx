'use client'
import Chart from 'react-apexcharts'
import { CreditStatistics } from '@/lib/utils/credit/types'
import { StatisticsCountCreditChart } from './StatisticsCountCreditChart'

export function StatisticsCreditChart({
  values,
  valuesTwo
}: {
  values: CreditStatistics
  valuesTwo: any
}) {
  const state = {
    options: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10
        },
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
              formatter: function (val) {
                return val
              }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#000000'
            }
          }
        }
      },
      labels: [
        'Desembolsados',
        'Aprobados',
        'En curso',
        'Finalizdos',
        'Refinanciados'
      ]
    },
    series: [
      values.total_dibursed,
      values.total_approved,
      values.total_progress,
      values.total_finalized,
      values.total_refinanced
    ]
  }
  return (
    <div className="flex flex-grow  flex-col shadow rounded-lg  bg-[#f5f5fb]  p-4 md:bg-white gap-2 overflow-scroll w-full h-auto lg:h-[380px]  ">
      <span className="font-bold  text-md pb-2 border-b-2 text-gray-400">
        {' '}
        Créditos
      </span>
      <div className="flex  justify-between gap-4 flex-col lg:flex-row">
        <Chart
          options={state.options}
          height={380}
          width={400}
          series={state.series}
          type="donut"
        />
        <div className=" flex-grow">
          <StatisticsCountCreditChart values={valuesTwo} />
        </div>
      </div>
    </div>
  )
}
