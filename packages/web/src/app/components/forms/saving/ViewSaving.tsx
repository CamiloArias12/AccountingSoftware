import { gql, useQuery } from '@apollo/client'
import Modal from '../../modal/Modal'
import { LabelView } from '../../input/LabelView'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Table from '../../table/Table'
import { Token } from '@/app/hooks/TokenContext'

const GET_SAVING = gql`
  query ($id: Int!) {
    getSaving(id: $id) {
      id
      identification
      lastName
      name
      qoutaValue
      startDate
      state
      nameSaving
    }
    findContributionBySaving(saving: $id) {
      date
      value
    }
  }
`

function ViewSaving({ id, setShow }: { id: number; setShow: any }) {
  const { context } = Token()
  const { data, loading, error } = useQuery(GET_SAVING, {
    variables: { id: id },
    context
  })

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'date',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue().split('T', 1)}
            </label>
          </div>
        ),

        header: () => 'Mes'
      },
      {
        accessorKey: 'value',

        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#F2FFA5] `}>
              $ {row.getValue().toLocaleString()}
            </label>
          </div>
        ),
        header: () => <span>Total cuota</span>
      }
    ],
    []
  )

  return (
    <Modal
      size="lg:w-[500px]  lg:h-auto bg-[#FCFCFC]"
      title=" Ahorro"
      onClick={() => setShow(false)}
    >
      <div className="flex flex-col gap-4">
        {data && (
          <>
            <div className="flex bg-white flex-col shadow-md justify-between rounded-lg mt-4 p-4">
              <label className=" text-input font-semibold border-b border-b-[#10417B] pb-2  my-2">
                {' '}
                Afiliado
              </label>
              <div className="grid grid-cols-2">
                <LabelView
                  value={data.getSaving.identification}
                  name="Identificación "
                />
                <LabelView
                  value={`${data.getSaving.name} ${data.getSaving.lastName} `}
                  name="Nombres "
                />
              </div>
            </div>

            <div className="flex bg-white flex-col shadow-md justify-between rounded-lg mt-2 p-4">
              <label className="text-input font-semibold border-b border-b-[#10417B] pb-2  m-2">
                {' '}
                Información ahorro
              </label>

              <div className="grid  grid-cols-2 gap-4 ">
                <LabelView value={data.getSaving.id} name="Id: " />
                <LabelView
                  value={`$ ${data.getSaving.qoutaValue.toLocaleString()} `}
                  name="Valor cuota mensual"
                />
                <LabelView
                  value={`${data.getSaving.startDate.split('T', 1)} `}
                  name="Fecha de inicio"
                />
                <LabelView
                  value={data.getSaving.nameSaving}
                  name="Tipo de ahorro"
                />

                <LabelView
                  value={data.findContributionBySaving.length}
                  name="Número de aportes: "
                />
                <LabelView
                  value={`$ ${data.findContributionBySaving
                    .reduce(
                      (accumulator: any, number: any) =>
                        accumulator + number.value,
                      0
                    )
                    .toLocaleString()}`}
                  name="Total aportes: "
                />
              </div>
            </div>
            <Table columns={columns} data={data.findContributionBySaving} />
          </>
        )}
      </div>
    </Modal>
  )
}

export default ViewSaving
