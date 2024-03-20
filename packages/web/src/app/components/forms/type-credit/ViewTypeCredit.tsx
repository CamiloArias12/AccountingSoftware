import { gql, useQuery } from '@apollo/client'
import Modal from '../../modal/Modal'
import { LabelView } from '../../input/LabelView'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Table from '../../table/Table'
import { Token } from '@/app/hooks/TokenContext'

const GET_TYPE_CREDIT = gql`
  query ($id: Int!) {
    getTypeCredit(id: $id) {
      id
      name
      interest
      auxiliaries {
        nature
        typeAccount
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

function ViewTypeCredit({ id, setShow }: { id: number; setShow: any }) {
  const { context } = Token()
  const { data, loading, error } = useQuery(GET_TYPE_CREDIT, {
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
        accessorKey: 'typeAccount',
        cell: info => info.getValue(),
        header: () => 'Tipo'
      }
    ],
    []
  )

  return (
    <Modal
      size=" lg:h-auto lg:w-[850px] bg-white"
      title=" Tipo de crédito"
      onClick={() => setShow(false)}
    >
      <div className="flex flex-col gap-4">
        {data && (
          <>
            <div className="flex bg-white flex-col md:flex-row shadow-sm justify-between rounded-lg md:mt-4 md:p-4">
              <LabelView value={data.getTypeCredit.name} name="Nombre" />
              <LabelView
                value={`${data.getTypeCredit.interest} %`}
                name="Interés"
              />
            </div>
            <div className="flex  bg-white flex-col overflow-y-scroll gap-4  shadow-sm rounded-lg md:p-4">
              <label className="text-input font-bold mb-2">Cuentas</label>
              <Table data={data.getTypeCredit.auxiliaries} columns={columns} />
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default ViewTypeCredit
