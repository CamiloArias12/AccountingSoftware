import { ColumnDef } from '@tanstack/react-table'
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import Modal from '../../modal/Modal'
import Table from '../../table/Table'
import { Credit } from '@/lib/utils/credit/types'
import { format } from 'date-fns'
const columnsSaving = () =>
  useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'saving',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </label>
          </div>
        ),

        header: () => 'Id'
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },

      {
        accessorKey: 'month',
        accessorFn: row => `${row.month} / ${row.year}`,
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue()}
            </label>
          </div>
        ),

        header: () => <span>Mes</span>
      }
    ],
    []
  )

function TableDisbursementsDetails({ disbursements }: { disbursements: any }) {
  console.log(disbursements)
  const columnsCredit = useMemo<ColumnDef<Credit>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        header: () => <span>Id</span>,
        size: 70
      },
      {
        accessorKey: 'identification',
        cell: info => info.getValue(),
        header: () => 'Identificacion'
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado',
        size: 150
      },

      {
        accessorKey: 'creditValue',
        accessorFn: row => row.creditValue + row.valuePrevius,
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#FFF1CD] `}>
              {' '}
              $ {row.getValue().toLocaleString()}
            </label>
          </div>
        ),

        header: () => <span>Monto</span>,
        size: 150
      },
      {
        accessorKey: 'nameCredit',
        cell: info => info.getValue(),
        header: () => <span>Tipo de crédito</span>,
        size: 150
      },
      {
        accessorKey: 'discountDate',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {format(new Date(row.getValue()), 'dd-MM-yyyy')}
            </label>
          </div>
        ),

        header: () => <span>Fecha de descuento</span>,
        size: 150
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue() + ' %',
        header: () => <span>Interés</span>,
        size: 70
      },
      {
        accessorKey: 'state',
        cell: (row: any) => (
          <div className="py-1">
            <label
              className={` py-1 px-4 text-sm rounded-[30px] font-medium ${
                row.getValue() === 'Aprobado'
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : row.getValue() === 'En curso'
                    ? 'bg-[#ECFF1C]  text-[#9F9431]'
                    : 'bg-[#F9E8BD] text-[#8A6914]'
              }`}
            >
              {row.getValue()}
            </label>
          </div>
        ),
        header: () => <span>Estado</span>
      }
    ],
    []
  )
  const columnsOther = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id_note',
        cell: info => info.getValue(),
        header: () => 'Id '
      },

      {
        accessorKey: 'date',
        cell: (row: any) => (
          <div className="py-1">
            <span className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </span>
          </div>
        ),

        header: () => <span>Fecha</span>
      },
      {
        accessorKey: 'concept',
        cell: info => info.getValue(),
        header: () => <span>Valor couta</span>
      }
    ],
    []
  )

  return (
    <Table
      data={disbursements}
      columns={disbursements[0]?.id ? columnsCredit : columnsOther}
    />
  )
}

export default TableDisbursementsDetails
