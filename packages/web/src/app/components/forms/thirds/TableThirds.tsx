import { Affiliate } from "@/lib/utils/thirds/types";
import { ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Table from "../../table/Table";
import { useMemo, useReducer, useState } from "react";

function TableThirds ({affiliates , setShowOptions}:{affiliates:Affiliate[],showOptions:boolean,setShowOptions:any}){
   
   const rerender = useReducer(() => ({}), {})[1]


  const columns = useMemo<ColumnDef<Affiliate>[]>(
    () => [
      {
        accessorKey: 'identification',
        header: 'Identificacion',
      },
      {
        accessorFn: row => `${row.name} ${row.lastName}`,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Nombres</span>,
      },
      {
        accessorKey: 'salary',
        header: () => 'Salario',
      },
      {
        accessorKey: 'phone',
        header: () => <span>Telefono</span>,
      },
      {
        accessorKey: 'city',
        header: 'Ciudad',
      },
      {
        accessorKey: 'status',
        header: 'Estado',
      },

    ],
    []
  )

  const [data, setData] = useState<Affiliate[]>(affiliates)
   console.log(data)
  return (
      <>
	 <Table columns={columns} data={data} setShowOptions={setShowOptions}/>
      </>

  );

}

export default TableThirds
