import { Affiliate } from '@/lib/utils/thirds/types';
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Table from '../../table/Table';
import {
  use,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useVirtual } from 'react-virtual';
import { motion } from 'framer-motion';
import { AddSvg } from '../../logo/Add';
import UpdateThird from './UpdateThird';
import ViewThird from './ViewThird';
import AlertModalSucces from '../../modal/AlertModalSucces';
import AlertModalError from '../../modal/AlertModalError';

export const revalidate = 0;
const UPDATE_STATUS = gql`
  mutation ($identification: Int!, $status: Boolean!) {
    updateStatus(identification: $identification, status: $status) {
      identification
    }
  }
`;

const DELETE_USER = gql`
  mutation ($identification: Int!) {
    deleteUser(identification: $identification)
  }
`;

function TableThirds({ affiliates }: { affiliates: Affiliate[] }) {
  console.log(affiliates);
  const [showOptions, setShowOptions] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showView, setShowView] = useState(false);
  const [userSelected, setUserSelected] = useState<number>(0);
  const [data, setData] = useState<Affiliate[]>(affiliates);

  const rerender = useReducer(() => ({}), {})[1];

  const [updateStatus, { data: statusData, loading, error }] =
    useMutation(UPDATE_STATUS);
  const [
    deleteUser,
    { data: deleteData, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_USER);
  const route = useRouter();

  const deleteUserHandle = () => {
    setShowWarning(true);
    deleteUser({
      variables: {
        identification: userSelected,
      },
    });
  };
  const updateUser = (identification: number, status: boolean) => {
    updateStatus({
      variables: {
        identification: identification,
        status: status,
      },
    });
  };

  useEffect(() => {
    setData(affiliates);
  }, [affiliates]);

  useEffect(() => {
    if (statusData) {
      route.refresh();
    }
  }, [statusData]);
  useEffect(() => {
    if (deleteData?.deleteUser) {
      route.refresh();
    }
  }, [deleteData]);

  const columns = useMemo<ColumnDef<Affiliate>[]>(
    () => [
      {
        accessorKey: 'identification',
        header: 'Identificacion',
      },
      {
        accessorFn: (row) => `${row.name} ${row.lastName}`,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Nombres</span>,
      },
      {
        accessorKey: 'phone',
        header: () => 'Telefono',
      },
      {
        accessorKey: 'cityResidence',
        header: 'Ciudad',
      },
      {
        accessorKey: 'status',
        cell: (row: any) => (
          <div className="py-1">
            <button
              className={` py-1 px-4 rounded-[30px] ${
                row.getValue()
                  ? 'bg-[#BAF7D0] text-sm  text-[#306E47]'
                  : 'bg-[#FECACA] text-sm'
              }`}
              onClick={() => {
                updateUser(
                  row.row._valuesCache.identification,
                  !row.getValue(),
                );
              }}
            >
              {row.getValue() ? 'Activo' : 'Inactivo'}
            </button>
          </div>
        ),

        header: 'Estado',
      },
    ],
    [],
  );

  const [sorting, setSorting] = useState<SortingState>([]);

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
  const [idrow, setIdRow] = useState<string>('');
  const [showWarning, setShowWarning] = useState(false);
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12,
  });
  const { virtualItems: virtualRows } = rowVirtualizer;
  useEffect(() => {
    if (deleteData) {
      if (deleteData?.deleteAccount) {
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

  return (
    <>
      <div className="flex flex-grow flex-col bg-white rounded-tr-sm rounded-b-sm ">
        <div className="flex items-center justify-between m-3  ">
          <div>
            {showOptions && (
              <div className="flex flex-row p-2 rounded-sm bg-[#F2F5FA] ">
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
                    setShowUpdate(true);
                  }}
                >
                  <img src="/edit.svg" />
                  <label className="font-sans px-6 text-sm">Editar</label>
                </button>
                <button
                  className="flex flex-row"
                  onClick={() => {
                    deleteUserHandle();
                  }}
                >
                  <img src="/delete.svg" />
                  <label className="font-sans px-6 text-sm">Eliminar</label>
                </button>
              </div>
            )}
          </div>

          <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-8 w-8 bg-[#10417B] ">
            <AddSvg color="#ffffff" />
          </div>
          <label className="pl-2 hidden group-hover:block text-[12px]">
            Crear
          </label>
        </div>

        {showUpdate && (
          <UpdateThird
            thirdIdentification={userSelected}
            setShow={setShowUpdate}
          />
        )}
        {showView && (
          <ViewThird thirdIdentification={userSelected} setShow={setShowView} />
        )}

        <div className=" text-sm mx-4  flex-grow">
          <table className=" w-full table-fixed  table ">
            <thead className="font-medium border-b-2 bg-[#F2F5FA] border-b-[#3C7AC2]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="rounded-lg" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className="text-start font-light pl-3 p-2 font-medium "
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
            <tbody className=" text-sm">
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<Affiliate>;
                return (
                  <>
                    <motion.tr
                      key={row.id}
                      className={`${
                        userSelected === row._valuesCache.identification &&
                        ' selected '
                      } hover:border-l-4  hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <>
                            <td
                              onClick={() => {
                                setShowOptions(true);
                                setUserSelected(
                                  Number(row._valuesCache.identification),
                                );
                                cell.column.columnDef.cell, cell.getContext();
                              }}
                              className="font-light px-2"
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
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {deleteData?.deleteUser && showWarning ? (
        <AlertModalSucces value="Se han eliminado el tercero" />
      ) : deleteData?.deleteUser === false && showWarning ? (
        <AlertModalError value="El tercero no se puede eliminar" />
      ) : (
        errorDelete && showWarning && <AlertModalError value="Error" />
      )}
    </>
  );
}

export default TableThirds;
