import ClickOutside from '../input/ClickOutSide'
import { AddSvg } from '../logo/Add'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'
import InputFieldSearch from '../input/InputSearch'
import ButtonOption from '../input/ButtonOption'
export type PropsOptionsTable = {
  setView?: any
  setUpdate?: any
  deleteHandle?: any
  setCreate?: any
  setDownloadCredit?: any
  setDownloadAccount?: any
  setImportAccount?: any
  handleRefinance?: any
  downloadCredit?: boolean
  handleDownloadPdf?: any
  handleDownloadXlsx?: any
  showOptions: boolean
  toggleSelect?: any
  createRoute?: string
  updateRoute?: string
  viewRoute?: string
  childrenCreateOptions?: ReactNode
  search: any
  setSearch: any
}

function OptionsTable({
  deleteHandle,
  setView,
  setCreate,
  setUpdate,
  showOptions,
  handleRefinance,
  setDownloadCredit,
  setDownloadAccount,
  setImportAccount,
  handleDownloadPdf,
  handleDownloadXlsx,
  createRoute,
  updateRoute,
  viewRoute,
  setSearch,
  search
}: PropsOptionsTable) {
  return (
    <>
      <div className="options-table">
        <motion.div
          animate={{
            opacity: [0, 1]
          }}
          transition={{ ease: 'easeOut', duration: 2 }}
          className="flex flex-row items-center justify-center gap-4 text-gray-500 font-medium rounded-lg "
        >
          {showOptions && (
            <>
              {setView && (
                <ButtonOption
                  className="button-style-table"
                  name="Ver"
                  onClick={() => {
                    setView(true)
                  }}
                  image="/view.svg"
                />
              )}
              {viewRoute && (
                <ButtonOption
                  className="button-style-table"
                  name="Ver"
                  image="/view.svg"
                  route={viewRoute}
                />
              )}

              {updateRoute && (
                <ButtonOption
                  className="button-style-table"
                  name="Editar"
                  image="/edit.svg"
                  route={updateRoute}
                />
              )}
              {setUpdate && (
                <ButtonOption
                  className="button-style-table"
                  name="Editar"
                  onClick={() => {
                    setUpdate(true)
                  }}
                  image="/edit.svg"
                />
              )}
              {deleteHandle && (
                <ButtonOption
                  className="button-style-table"
                  name="Eliminar"
                  onClick={deleteHandle}
                  image="/delete.svg"
                />
              )}

              {handleRefinance && (
                <ButtonOption
                  className="button-style-table"
                  name="Refinanciar"
                  onClick={handleRefinance}
                  image="/refinance.svg"
                />
              )}

              {setDownloadCredit && (
                <>
                  <ButtonOption
                    className="button-style-table"
                    name="Excel"
                    onClick={handleDownloadXlsx}
                    image="/excel.svg"
                  />
                  <ButtonOption
                    className="button-style-table"
                    name="Pdf"
                    onClick={handleDownloadPdf}
                    image="/pdf.svg"
                  />
                </>
              )}
            </>
          )}
        </motion.div>
        <div className="hidden  md:flex">
          <InputFieldSearch
            value={search}
            onChange={e => setSearch(String(e.target.value))}
          />
        </div>
        <div className="flex flex-row  gap-4 text-gray-500 font-medium rounded-lg ">
          {setDownloadAccount && (
            <ButtonOption
              className="button-style-table"
              name="Descargar"
              onClick={setDownloadAccount}
              image="/download.svg"
            />
          )}
          {setImportAccount && (
            <ButtonOption
              className="button-style-table"
              name="Importar"
              onClick={setImportAccount}
              image="/upload.svg"
            />
          )}

          {setCreate && (
            <ButtonOption
              className="button-style-table"
              name="Crear"
              onClick={() => {
                setCreate(true)
              }}
              image="/create.svg"
            />
          )}

          {createRoute && (
            <>
              <ButtonOption
                className="button-style-table"
                name="Crear"
                image="/create.svg"
                route={createRoute}
              />
            </>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <InputFieldSearch
          value={search}
          onChange={e => setSearch(String(e.target.value))}
        />
      </div>
    </>
  )
}

export default OptionsTable
