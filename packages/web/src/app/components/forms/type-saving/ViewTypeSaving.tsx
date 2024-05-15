import { gql, useQuery } from '@apollo/client'
import Modal from '../../modal/Modal'
import { LabelView } from '../../input/LabelView'
import { useMemo } from 'react'
import { ColumnDef, useReactTable } from '@tanstack/react-table'
import { fuzzyFilter } from '../type-account/TableTypeAccount'
import Table from '../../table/Table'
import { Token } from '@/app/hooks/TokenContext'

const GET_TYPE_SAVING = gql`
  query ($id: Int!) {
    getTypeSaving(id: $id) {
      id
      name
      auxiliaries {
        nature
        percentage
        account {
          typeAccount {
            code
            name
          }
        }
      }
    }
  }
`

function ViewTypeSaving({ id, setShow }: { id: number; setShow: any }) {
  const { context } = Token()
  const { data, loading, error } = useQuery(GET_TYPE_SAVING, {
    variables: { id: id },
    context
  })
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'account.typeAccount.code',
        cell: info => info.getValue(),
        header: () => <span>Código</span>
      },
      {
        accessorKey: 'account.typeAccount.name',
        cell: info => info.getValue(),
        header: () => 'Nombre'
      },
      {
        accessorKey: 'nature',
        cell: info => info.getValue(),
        header: () => <span>Naturaleza</span>
      },
      {
        accessorKey: 'percentage',
        cell: info => info.getValue() + ' %',
        header: () => 'Porcentaje'
      }
    ],
    []
  )

  return (
    <Modal
      size="  lg:h-auto lg:w-[850px] bg-white"
      title=" Tipo de ahorro"
      onClick={() => setShow(false)}
    >
      <div className="flex flex-col flex-grow ">
        {data && (
          <>
            <div className="flex-grow flex  flex-row justify-between rounded-lg  mt-4 p-4">
              <LabelView value={data.getTypeSaving.name} name="Nombre" />
            </div>
            <div className="flex bg-white flex-col overflow-y-scroll gap-4  shadow-sm rounded-lg p-4">
              <label className="text-input font-bold mb-2 pb-2 border-b ">
                Cuentas
              </label>
              <Table data={data.getTypeSaving.auxiliaries} columns={columns} />
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default ViewTypeSaving
