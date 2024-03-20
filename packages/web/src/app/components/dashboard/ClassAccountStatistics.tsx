import { getClient } from '@/lib/graphql/apollo-client-server'
import { classColors } from '@/lib/utils/type-account/options'
import { ClassAccountStatistics } from '@/lib/utils/type-account/types'
export const revalidate = 0
import { gql } from '@apollo/client'
import { signOut } from 'next-auth/react'
const CLASS_STATISTICS = gql`
  query {
    getClassAccountStatics {
      code
      name
      credit_balance
      debit_balance
    }
  }
`

async function StatisticsClassAccount({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: CLASS_STATISTICS,
    context: { headers: { Authorization: token } }
  })
  signOut({ callbackUrl: '/auth/login' })

  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <div className=" flex-col flex gap-4  bg-[#f5f5fb] md:bg-white p-4 rounded-lg overflow-scroll w-[98vw] md:w-auto ">
      <span className="font-bold text-md text-gray-400 pb-2 border-b-2">
        {' '}
        Balance cuentas
      </span>
      <div>
        <table className=" w-auto text-center text-sm font-light table-account-statistics ">
          <thead className=" font-medium ">
            <tr className="">
              <th
                scope="col"
                className=" text-center w-1/4 py-4 px-6 text-gray-600 "
              >
                Código
              </th>
              <th
                scope="col"
                className=" text-center w-1/4 py-4 px-6 text-gray-600 "
              >
                Nombre
              </th>
              <th
                scope="col"
                className="w-1/4 py-4 px-6 text-center text-gray-600 "
              >
                Débito
              </th>
              <th
                scope="col"
                className="w-1/4 py-4 px-6 text-center text-gray-600 "
              >
                Crédito
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data.getClassAccountStatics.map((classAccount: any, index) => (
              <tr key={index} className=" ">
                {Object.values(classAccount).map((value: any, columnIndex) => (
                  <td
                    key={columnIndex}
                    className="font-normal py-2 items-center"
                  >
                    {columnIndex === 2 ? (
                      <span className="text-yellow-600 bg-yellow-200 p-1 rounded-lg font-bold">{`$ ${value.toLocaleString()}`}</span>
                    ) : columnIndex === 3 ? (
                      <span className="text-green-600  p-1 font-bold rounded-lg bg-green-200 ">{`$ ${value.toLocaleString()}`}</span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StatisticsClassAccount
