import { ColumnDef, Row, SortingState, flexRender } from '@tanstack/react-table'
import Table from '../../table/Table'
import { useMemo } from 'react'
import { DeferredSaving } from '@/lib/utils/savings/types'

function TableCashDetails({ cashs }: { cashs: any }) {
  const columnsCredit = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },
      {
        accessorKey: 'paymentDate',
        cell: (row: any) => (
          <div className="py-1">
            <span className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </span>
          </div>
        ),

        header: () => <span>Fecha de pago</span>
      },
      {
        accessorKey: 'interest',
        cell: info => info.getValue(),
        header: () => <span>Interés</span>,
        size: 50
      },
      {
        accessorKey: 'credit',
        cell: info => info.getValue(),
        header: () => <span>Crédito</span>,
        size: 50
      },
      {
        accessorKey: 'installmentNumber',
        cell: info => info.getValue(),
        header: () => <span>Couta</span>,
        size: 50
      },
      {
        accessorKey: 'capital',
        cell: (info: any) => <>$ {info.getValue().toLocaleString()}</>,
        header: () => <span>Valor</span>,
        size: 50
      },

      {
        accessorKey: 'isDeferred',
        cell: (info: any) => (
          <>{info.getValue() ? info.getValue() : 'Sin interés'}</>
        ),
        header: () => <span>Diferido</span>,
        size: 50
      }
    ],
    []
  )

  const columnsOther = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
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
        header: () => <span>Concepto</span>
      }
    ],
    []
  )

  const columnsSaving = useMemo<ColumnDef<DeferredSaving>[]>(
    () => [
      {
        accessorKey: 'saving',
        cell: info => info.getValue(),
        header: () => 'Id ahorro '
      },

      {
        accessorKey: 'name',
        accessorFn: row => `${row.name} ${row.lastName}`,
        cell: info => info.getValue(),
        header: () => 'Afiliado'
      },
      {
        accessorKey: 'qoutaValue',
        cell: (info: any) => <>$ {info.getValue()?.toLocaleString()}</>,
        header: () => <span>Valor couta</span>
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

  return (
    <div>
      <Table
        columns={
          cashs[0]?.credit
            ? columnsCredit
            : cashs[0]?.saving
              ? columnsSaving
              : columnsOther
        }
        data={cashs}
      />
    </div>
  )
}

export default TableCashDetails
