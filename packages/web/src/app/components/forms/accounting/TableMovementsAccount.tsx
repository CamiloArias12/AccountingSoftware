import {
  ColumnDef,
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVirtual } from 'react-virtual';
import { motion } from 'framer-motion';
import { MovementAccount } from '@/lib/utils/accounting/types';


function TableMovementsAccount({ movementAccounts }: { movementAccounts: MovementAccount[] }) {

   const columnHelper = createColumnHelper<MovementAccount>()
   console.log(movementAccounts)
  const columns = useMemo<ColumnDef<MovementAccount>[]>(
    () => [
     columnHelper.group ({
	 id:"afiliate",
	 header:() =>'Cuenta',
	 enableResizing:true,
	 columns: [
      {
        accessorKey: 'code',
        cell: (info) => info.getValue(),
        header: () => <span>Codigo</span>,
        size: 50,
      },
      {
        accessorKey: 'nameAccount',
        cell: (info) => info.getValue(),
        header: () => 'Nombre',
      }
    ]}),
      columnHelper.group ({
	 id:"afiliate",
	 header:() =>'Tercero',

	 enableResizing:true,
	 columns: [
	 {
        accessorKey: 'identificationThird',
        cell: (row: any) => (
          <div className="py-1">
              {row.getValue()}
          </div>
        ),

        header: () => <span>Identificacion</span>,
      },
      {
        accessorKey: 'nameThird',
        cell: (info) => info.getValue(),
        header: 'Nombre',
      },
      ]}),
   columnHelper.group ({
	 id:"afiliate",
	 header:() =>'Saldo',
	 enableResizing:true,
	 columns: [
      {
        accessorKey: 'debit',
	 cell: (row: any) => (
	    row.getValue().toLocaleString()
        ),
        header: () => <span>Debito</span>,
      },

      {
        accessorKey: 'credit',
        cell: (info) => info.getValue().toLocaleString(),
        header: () => <span>Credito</span>,
      },


      ]}),
         
    ],
    [],
  );

  const [data, setData] = useState<MovementAccount[]>(movementAccounts);
  const [showOptions, setShowOptions] = useState(false);
  const route = useRouter();
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

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 12,
  });
  const { virtualItems: virtualRows } = rowVirtualizer;

  const [id, setId] = useState<number>(0);
  
  return (
    <>
      <div className="flex flex-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">

        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="h-full w-full table-fixed table-account ">
            <thead className="font-medium ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="rounded-lg  " key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className="text-center  border font-light pl-3 py-2 font-medium "
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
                      } hover:border-l-4 text-center hover:border-l-[#3C7AC2] `}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            onClick={() => {
                              setShowOptions(true);

                              setId(Number(row._valuesCache.id));
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
      </div>
    </>
  );
}

export default TableMovementsAccount;
