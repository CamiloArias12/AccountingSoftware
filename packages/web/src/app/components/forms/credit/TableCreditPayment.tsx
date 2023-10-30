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
  useReducer,
  useRef,
  useState,
} from 'react';
import { AddSvg } from '../../logo/Add';
import { useRouter } from 'next/navigation';
import { useVirtual } from 'react-virtual';
import { motion } from 'framer-motion';
import { Credit, InstallmentPayment } from '@/lib/utils/credit/types';
import UpdateCredit from './UpdateCredit';
import { gql, useMutation } from '@apollo/client';
import AlertModalError from '../../modal/AlertModalError';
import Button from '../../input/Button';
import InputField from '../../input/InputField';

const PAYMENT_CREDIT_INSTALLMENT = gql`
  mutation ($data: InputCreateInstallmentAccount!) {
    createInstallmentAccount(data: $data)
  }
`;
function TableCreditsPayment({
  installmentPayment,
  dateStart,
}: {
  installmentPayment: InstallmentPayment[];
  dateStart: Date;
}) {
  const [data, setData] = useState<InstallmentPayment[]>(installmentPayment);
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

  const columns = useMemo<ColumnDef<InstallmentPayment>[]>(
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
        accessorKey: 'credit',
        cell: (info) => info.getValue(),
        header: () => <span>Credito</span>,
        size: 50,
      },
      {
        accessorKey: 'name',
        accessorFn: (row) => `${row.name} ${row.lastName}`,
        cell: (info) => info.getValue(),
        header: () => 'Afiliado',
      },
      {
        accessorKey: 'installmentNumber',
        cell: (info) => info.getValue(),
        header: () => <span>Numero couta</span>,
        size: 50,
      },
      {
        accessorKey: 'interest',
        cell: (info) => info.getValue(),
        header: () => <span>Interes</span>,
        size: 50,
      },
      {
        accessorKey: 'paymentDate',
        cell: (info) => info.getValue(),
        header: () => <span>Fecha de pago</span>,
      },
      {
        accessorKey: 'capital',
        cell: (info) => info.getValue(),
        header: () => <span>Capital</span>,
      },
      {
        accessorKey: 'interestPayment',
        cell: (info) => info.getValue(),
        header: () => <span>Interes</span>,
      },
      {
        accessorKey: 'totalPayment',
        cell: (info) => info.getValue(),
        header: () => <span>Total pago</span>,
      },
    ],
    [],
  );

  const [showOptions, setShowOptions] = useState(false);
  const route = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [
    paymentCreditInstallments,
    { data: dataPayment, loading: loadingPayment, error: errorPayment },
  ] = useMutation(PAYMENT_CREDIT_INSTALLMENT);
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
        <div className={`flex pr-2 flex-grow flex-col text-input `}>
          <label className={`pb-2 `}>Concepto</label>
          <input
            type="text"
            value={concept}
            className={`bg-white  rounded-sm border h-[30px] `}
            onChange={(e) => {
              setConcept(e.target.value);
            }}
          />
        </div>

        <div className="mx-4 my-2 flex-grow text-sm">
          <table className="h-full w-full table-fixed  ">
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
        {dataPayment?.createInstallmentAccount === false && showWarning ? (
          <AlertModalError value={`El credito no se puede refinanciar`} />
        ) : (
          errorPayment && showWarning && <AlertModalError value="Error" />
        )}
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
export default TableCreditsPayment;
