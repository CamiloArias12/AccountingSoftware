'use client';

import TableCredits from '@/app/components/forms/credit/TableCredit';
import FormSaving from '@/app/components/forms/saving/FormSaving';
import TableSavings from '@/app/components/forms/saving/TableSaving';
import { AddSvg } from '@/app/components/logo/Add';
import { Credit } from '@/lib/utils/credit/types';
import { Saving } from '@/lib/utils/savings/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect, useState } from 'react';

export const revalidate = 0;

function Savings({ savings }: { savings: Saving[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('create');
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  useEffect(() => {
    if (search) {
      setShowModalCreate(true);
    }
  }, [search]);
  return (
    <div className="flex-grow flex h-full">
      {showModalCreate && (
        <FormSaving setShowModalCreate={setShowModalCreate} />
      )}
      <TableSavings savings={savings} setShowModalCreate={setShowModalCreate} />
    </div>
  );
}

export default Savings;
