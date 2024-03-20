export function PaginationTable({ table }: { table: any }) {
  return (
    <>
      <div className=" text-sm  flex justify-end">
        <div className=" text-input md:text-sm  flex w-[400px] justify-end md:justify-center items-center gap-2">
          <button
            className="border rounded-[50%] md:rounded shadow-md p-[4px] md:py-2 md:px-3 font-extrabold disabled:text-red-700 disabled:cursor-not-allowed"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded-[50%] md:rounded shadow-md py-[4px] px-[8px] md:py-2 md:px-3 font-extrabold disabled:text-red-700 disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded-[50%] md:rounded shadow-md py-[4px] px-[8px] md:py-2 md:px-3 font-extrabold disabled:text-red-700 disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded-[50%] md:rounded shadow-md p-[4px] md:py-2 md:px-3 font-extrabold disabled:text-red-700 disabled:cursor-not-allowed"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="hidden md:flex w-[200px] items-center border rounded shadow-md p-1  gap-1">
            <div>Pagina</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="  hidden md:flex items-center gap-1">
            Pagina
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
        </div>
      </div>
    </>
  )
}
