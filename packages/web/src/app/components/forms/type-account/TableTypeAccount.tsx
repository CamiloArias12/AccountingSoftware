import { Affiliate } from "@/lib/utils/thirds/types";
import { ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Table from "../../table/Table";
import { TypeAccounnt } from "@/lib/utils/type-account/types";
import { useMemo, useReducer, useState } from "react";

function TableTypeAccount({typeAccounts,setShowOptions}:{typeAccounts:TypeAccounnt[],setShowOptions:any}){
   
   const rerender = useReducer(() => ({}), {})[1]

  const columns = useMemo<ColumnDef<TypeAccounnt>[]>(
    () => [
      {
        accessorKey: 'code',
        cell: info => info.getValue(),
        header: () => <span>Codigo</span>,
      },
      {
        accessorKey: 'name',
        cell: info => info.getValue(),
        header: () => 'Salario',
      },
      {
        accessorKey: 'nature',
        cell: info => info.getValue(),
        header: () => <span>Naturaleza</span>,
      },

    ],
    []
  )

  const [data, setData] = useState<TypeAccounnt[]>(typeAccounts)

  return (
      <>
	 <Table columns={columns} data={data} setShowOptions={setShowOptions}/>
      </>

  );

}

export default TableTypeAccount
