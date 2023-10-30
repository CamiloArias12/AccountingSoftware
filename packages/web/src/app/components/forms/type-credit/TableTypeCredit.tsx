import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { AddSvg } from '../../logo/Add';
import { useRouter } from 'next/navigation';
import { useVirtual } from 'react-virtual';
import { motion } from 'framer-motion';
import { TypeCredit } from '@/lib/utils/type-credit/types';
import { gql, useMutation } from '@apollo/client';
import { useTypeCredit } from '@/app/hooks/type-credit/TypeCreditInput';
import InputField from '../../input/InputField';
import AlertModalSucces from '../../modal/AlertModalSucces';
import AlertModalError from '../../modal/AlertModalError';

const DELETE_TYPE_CREDIT = gql`
  mutation ($id: Int!) {
    deleteTypeCredit(id: $id)
  }
`;
const UPDATE_TYPE_CREDIT = gql`
  mutation ($data: UpdateTypeCreditInput!, $id: Float!) {
    updateTypeCredit(data: $data, id: $id)
  }
`;

function TableTypeCredit({
  typeCredits,
  setShowModalCreate,
}: {
  typeCredits: TypeCredit[];
  setShowModalCreate: any;
}) {
  console.log(typeCredits);
  const columns = useMemo<ColumnDef<TypeCredit>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: () => <span>Id</span>,
      },
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        header: () => 'Nombre',
      },
      {
        accessorKey: 'interest',
        cell: (row: any) => (
          <div className="py-1">
            <label className={` py-1 px-4 rounded-[30px] bg-[#DDFFBB] `}>
              {row.getValue()} %
            </label>
          </div>
        ),

        header: () => <span>Interes</span>,
      },
    ],
    [],
  );

  useEffect(() => {
    setData(typeCredits);
  }, [typeCredits]);

  const [data, setData] = useState<TypeCredit[]>(typeCredits);
  const [showOptions, setShowOptions] = useState(false);
  const route = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selected, setSelected] = useState<number>(0);
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

  const [idrow, setIdRow] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const [update, setUpdate] = useState<boolean>(false);
  const [
    deleteTypeCredit,
    { data: deleteData, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_TYPE_CREDIT);
  const { typeCredit, handleNumber, setTypeCredit, handleTypeCredit } =
    useTypeCredit();
  const [
    updateTypeCredit,
    { data: updateData, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_TYPE_CREDIT);
  const [showWarning, setShowWarning] = useState(false);
  const [showWarningUpdate, setShowWarningUpdate] = useState(false);

  useEffect(() => {
    if (deleteData?.deleteTypeCredit) {
      route.refresh();
    }
  }, [deleteData]);

  useEffect(() => {
    if (updateData) {
      if (updateData?.updateTypeCredit) {
        setUpdate(false);
        route.refresh();
      }
      const timeout = setTimeout(() => {
        setShowWarningUpdate(false);
      }, 3000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [updateData, errorUpdate]);

  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteTypeCredit) {
        route.refresh();
      }

      console.log('delete');
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 5000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [deleteData, errorDelete]);

  const deleteTypeCreditHandle = () => {
    setShowWarning(true);
    deleteTypeCredit({
      variables: {
        id: selected,
      },
    });
  };

  const updateTypeCreditHandle = () => {
    setShowWarningUpdate(true);
    updateTypeCredit({
      variables: {
        data: typeCredit,
        id: selected,
      },
    });
  };

  return (
    <>
      <div className="flex fleCuentasx-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <div className="flex items-center justify-between m-3  ">
          <div>
            {showOptions && (
              <div className="flex flex-row p-2 rounded-[40px] bg-[#F2F5FA] ">
                <button
                  className="flex flex-row"
                  onClick={() => {
                    setUpdate(true);
                  }}
                >
                  <img src="/edit.svg" />
                  <label className="font-sans px-6 text-sm">Editar</label>
                </button>
                <button
                  className="flex flex-row"
                  onClick={() => {
                    deleteTypeCreditHandle();
                  }}
                >
                  <img src="/delete.svg" />
                  <label className="font-sans px-6 text-sm">Eliminar</label>
                </button>
              </div>
            )}
          </div>

          <div
            className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
            onClick={() => {
              setShowModalCreate(true);
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
          <table className="w-full table-fixed table  ">
            <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="rounded-lg" key={headerGroup.id}>
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
                    {row.id == idrow && update ? (
                      <tr className=" h-24 border-b-2 border-[#8C4708] px-2 ">
                        <td className="bg-white h-full">{selected}</td>
                        <td className="px-2 bg-white">
                          <InputField
                            name="name"
                            label=""
                            value={typeCredit.name}
                            onChange={handleTypeCredit}
                          />
                        </td>
                        <td className="px-2 bg-white flex flex-row h-full items-center  ">
                          <InputField
                            name="interest"
                            label=""
                            value={typeCredit.interest}
                            onChange={handleTypeCredit}
                            onBlur={handleNumber}
                          />

                          <div className="ml-4 flex flex-col">
                            <button
                              className="h-[20px] w-[20px] mb-2"
                              onClick={() => {
                                updateTypeCreditHandle();
                              }}
                            >
                              <img
                                src="/accept.png"
                                className="w-full h-full "
                              />
                            </button>
                            <button
                              className="h-[20px] w-[20px]"
                              onClick={() => {
                                setUpdate(false);
                              }}
                            >
                              <img
                                src="/cancel.png"
                                className="w-full h-full "
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <motion.tr
                        key={row.id}
                        className={`${
                          selected === row._valuesCache.id && ' selected '
                        }  hover:border-l-4  hover:border-l-[#3C7AC2] `}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <>
                              <td
                                onClick={() => {
                                  setShowOptions(true);
                                  if (!update) {
                                    setTypeCredit({
                                      name: String(row._valuesCache.name),
                                      interest: Number(
                                        row._valuesCache.interest,
                                      ),
                                    });
                                    setSelected(Number(row._valuesCache.id));
                                  }
                                  if (update === false) {
                                    if (idrow == row.id) {
                                      setIdRow(row.id);
                                      setExpanded(!expanded);
                                    } else {
                                      setExpanded(false);
                                      setIdRow(row.id);
                                      setExpanded(!true);
                                    }
                                  }
                                  console.log('Flex render', row._valuesCache);
                                }}
                                className="font-light px-2 py-2"
                                key={cell.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </td>
                            </>
                          );
                        })}
                      </motion.tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {updateData?.updateTypeCredit && showWarningUpdate ? (
        <AlertModalSucces value="Se han actualizado los datos" />
      ) : updateData?.updateTypeCredit === false && showWarningUpdate ? (
        <AlertModalError value="Los datos no se pueden actualizar" />
      ) : (
        errorUpdate && showWarningUpdate && <AlertModalError value="Error" />
      )}
      {deleteData?.deleteTypeCredit && showWarning ? (
        <AlertModalSucces value="Se han eliminado el tipo de ahorro" />
      ) : deleteData?.deleteTypeCredit === false && showWarning ? (
        <AlertModalError value="El tipo de ahorro no se puede eliminar" />
      ) : (
        errorDelete && showWarning && <AlertModalError value="Error" />
      )}
    </>
  );
}

export default TableTypeCredit;
