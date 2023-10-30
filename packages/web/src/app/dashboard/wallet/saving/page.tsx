import { gql } from '@apollo/client';
import { getClient } from '@/lib/graphql/apollo-client-server';
import { Credit } from '@/lib/utils/credit/types';
import { Saving } from '@/lib/utils/savings/types';
import Savings from './Savings';

export const revalidate = 0;

async function getSavings(): Promise<Saving[]> {
  const CREDITS = gql`
    query {
      getAllSaving {
        id
        identification
        lastName
        name
        qoutaValue
        startDate
        nameSaving
      }
    }
  `;
  const { data } = await getClient().query({ query: CREDITS });
  return data.getAllSaving;
}

async function PageSaving() {
  const savings: Saving[] = await getSavings();
  console.log(savings);

  return (
    <>
      <Savings savings={savings} />
    </>
  );
}

export default PageSaving;
