import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AddSvg } from '../../logo/Add';
import { useRouter } from 'next/navigation';
import { useVirtual } from 'react-virtual';
import { motion } from 'framer-motion';
import { gql, useMutation } from '@apollo/client';
import AlertModalError from '../../modal/AlertModalError';
import AlertModalSucces from '../../modal/AlertModalSucces';
import { Movement } from '@/lib/utils/accounting/types';
import ViewMovementAccount from './ViewAccountMovement';

const REFINANCE = gql`
  mutation ($id: Int!) {
    isRefinance(id: $id)
  }
`;

const DELETE_CREDIT = gql`
  mutation ($id: Int!) {
    deleteCredit(id: $id)
  }
`;
function TableMovements({ credits }: { credits: Movement[] }) {
  const columns = useMemo<ColumnDef<Movement>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: () => <span>Id</span>,
        size: 50,
      },
      {
        accessorKey: 'movement.date',
        cell: (info) => info.getValue(),
        header: () => 'Fecha',
      },
            {
        accessorKey: 'movement.concept',
        cell: (info) => info.getValue(),
        header: () => <span>Concepto</span>,
      },
	 {
        accessorKey: 'movement.state',
        cell: (row: any) => (
          <div
              className={` py-1 px-4 rounded-[30px] ${
                row.getValue()
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : 'bg-[#FECACA] text-sm'
              }`}
            >
              {row.getValue() ? 'Activo' : 'Inactivo'}
          </div>
        ),

        header: 'Estado',
      },
      {
        accessorKey: 'movement.accounting',
        cell: (info) => info.getValue(),
        header: () => <span>Contabilizacion</span>,
      },

         
    ],
    [],
  );

  const [data, setData] = useState<Movement[]>(credits);
  const [showOptions, setShowOptions] = useState(false);
  const route = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [
    isRefinance,
    { data: dataRefinance, loading: loadingRefinance, error: errorRefinance },
  ] = useMutation(REFINANCE);
  const [
    deleteCredit,
    { data: deleteData, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_CREDIT);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12,
  });
  const { virtualItems: virtualRows } = rowVirtualizer;

  const [id, setId] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [showView, setShowView] = useState<boolean>(false);

  const [showWarning, setShowWarning] = useState(false);
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  useEffect(() => {
    setData(credits);
  }, [credits]);

  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 1000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dataRefinance, errorRefinance]);

  const deleteCreditHandle = () => {
    setShowWarningDelete(true);
    deleteCredit({
      variables: {
        id: id,
      },
    });
  };

  const handleRefinance = () => {
    setShowWarning(true);
    isRefinance({
      variables: {
        id: id,
      },
    });
  };
  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteCredit) {
        route.refresh();
      }

      console.log('delete');
      const timeout = setTimeout(() => {
        setShowWarningDelete(false);
      }, 3000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [deleteData, errorDelete]);

  if (dataRefinance?.isRefinance) {
    route.push(`/dashboard/wallet/credit/${id}`);
  }
   console.log(credits[id].movement.id)
  return (
    <>
      {showView && <ViewMovementAccount idMovement={credits[id].id} setView={setShowView} movemnts={[credits[index]]}/>}
      <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <div className="flex items-center justify-between m-3  ">
          <div>
            {showOptions && (
              <div className="flex flex-row p-2 rounded-lg bg-[#F2F5FA] ">
                <button
                  className="flex flex-row"
                  onClick={() => {
                    setShowView(true);
                  }}
                >
                  <img src="/view.svg" />
                  <label className="font-sans px-6 text-sm">Ver</label>
                </button>

                <button
                  className="flex flex-row"
                  onClick={() => {
                  }}
                >
                  <img src="/edit.svg" />
                  <label className="font-sans px-6 text-sm">Editar</label>
                </button>
                <button
                  className="flex flex-row"
                  onClick={() => {
                    deleteCreditHandle();
                  }}
                >
                  <img src="/delete.svg" />
                  <label className="font-sans px-6 text-sm">Eliminar</label>
                </button>
                <button
                  className="flex flex-row"
                  onClick={() => {
                    handleRefinance();
                  }}
                >
                  <img src="/refinance.svg" />
                  <label className="font-sans px-6 text-sm">Refinanciar</label>
                </button>
              </div>
            )}
          </div>

          <div
            className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
            onClick={() => {
              route.push('/dashboard/wallet/credit/create');
            }}
          >
            <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-8 w-8 bg-[#10417B] ">
              <AddSvg color="#ffffff" />
            </div>
            <label className="pl-2 hidden group-hover:block text-[12px]">
              Crear
            </label>
          </div>
        </div>

        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="h-full w-full table-fixed table ">
            <thead className="font-medium ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="rounded-lg  " key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className="text-start font-light pl-3 py-2 font-medium "
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className=" ">
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<any>;
                return (
                  <>
                    <motion.tr
                      key={row.id}
                      className={` ${
                        id === row._valuesCache.id && 'selected'
                      } hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            onClick={() => {
                              setShowOptions(true);

                              setId(Number(row.index));
                              setIndex(Number(row.index));
			      console.log(row.index)
                            }}
                            className="font-light px-2 py-2"
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        );
                      })}
                    </motion.tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {dataRefinance?.isRefinance === false && showWarning ? (
          <AlertModalError value={`El credito no se puede refinanciar`} />
        ) : (
          errorRefinance && showWarning && <AlertModalError value="Error" />
        )}

        {deleteData?.deleteCredit && showWarningDelete ? (
          <AlertModalSucces value="Se han eliminado el credito" />
        ) : deleteData?.deleteCredit === false && showWarningDelete ? (
          <AlertModalError value="El credito no se puede eliminar" />
        ) : (
          errorDelete && showWarningDelete && <AlertModalError value="Error" />
        )}
      </div>
    </>
  );
}

export default TableMovements;