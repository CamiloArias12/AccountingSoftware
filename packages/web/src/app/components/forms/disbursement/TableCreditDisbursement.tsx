import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  HTMLProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { useVirtual } from 'react-virtual';
import { motion } from 'framer-motion';
import { Credit } from '@/lib/utils/credit/types';
import { gql, useMutation } from '@apollo/client';
import Button from '@/app/components/input/Button';

const PAYMENT_CREDIT_DISBURSEMENT = gql`
  mutation ($data: InputCreateInstallmentAccount!) {
    createInstallmentAccount(data: $data)
  }
`;
function TableCreditsDisbursement({
  credits,
  dateStart,
}: {
  credits: Credit[];
  dateStart: Date;
}) {
  const [data, setData] = useState<Credit[]>(credits);
  const [rowSelection, setRowSelection] = useState({});
  const [concept, setConcept] = useState('');
  useEffect(() => {
    setData(
      data.map((row, index) => {
        if (index in rowSelection) {
          return { ...row, isSelected: true };
        } else {
          return { ...row, isSelected: false };
        }
      }),
    );
  }, [rowSelection]);

  const columns = useMemo<ColumnDef<Credit>[]>(
    () => [
      {
        id: 'select',
        size: 40,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: () => <span>Crédito</span>,
        size: 50,
      },
      {
        accessorKey: 'name',
        accessorFn: (row) => `${row.name} ${row.lastName}`,
        cell: (info) => info.getValue(),
        header: () => 'Afiliado',
      },
      {
        accessorKey: 'creditValue',
        cell: (info) => info.getValue(),
        header: () => <span>Valor</span>,
        size: 50,
      },
      {
        accessorKey: 'interest',
        cell: (info) => info.getValue(),
        header: () => <span>Interés</span>,
        size: 50,
      },
      {
        accessorKey: 'discountDate',
        cell: (info) => info.getValue(),
        header: () => <span>Fecha de descuento</span>,
      },
      ],
    [],
  );

  const route = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [
    paymentCreditInstallments,
    { data: dataPayment, loading: loadingPayment, error: errorPayment },
  ] = useMutation(PAYMENT_CREDIT_DISBURSEMENT);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
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

  const [showWarning, setShowWarning] = useState(false);

  const handlePaymnetInstallment = () => {
    setShowWarning(true);
    paymentCreditInstallments({
      variables: {
        data: {
          installments: data,
          date: dateStart,
          concept: concept,
        },
      },
    });
  };

  return (
    <div className="m-4">
      <div className="flex  flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="h-full w-full table-fixed table ">
            <thead className="font-medium border-b-4 bg-[#F2F5FA] border-b-[#3C7AC2]">
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
                  <motion.tr
                    key={row.id}
                    className=" hover:border-l-4  hover:border-l-[#3C7AC2] "
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td className="font-light px-2 py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
               <div className="pt-10 m-4 flex justify-end">
          <div className="pr-4">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
            />
          </div>
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            onClick={() => {
              handlePaymnetInstallment();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + 'cursor-pointer'}
      {...rest}
    />
  );
}
export default TableCreditsDisbursement;
