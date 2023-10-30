import { getClient } from '@/lib/graphql/apollo-client-server';
import { gql } from '@apollo/client';
import TypeCredits from './TypeCredit';
import { TypeCredit } from '@/lib/utils/type-credit/types';

export const revalidate = 0;

export default async function Page() {
  const typeCredits: TypeCredit[] = await getTypeCredits();

  console.log(typeCredits);
  return (
    <>
      <TypeCredits typeCredits={typeCredits} />
    </>
  );
}

async function getTypeCredits(): Promise<TypeCredit[]> {
  const TYPE_CREDITS = gql`
    query {
      getTypeCreditAll {
        id
        name
        interest
      }
    }
  `;

  const { data } = await getClient().query({ query: TYPE_CREDITS });

  return data.getTypeCreditAll;
}
