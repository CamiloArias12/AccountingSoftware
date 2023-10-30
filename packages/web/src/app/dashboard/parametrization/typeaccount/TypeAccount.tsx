'use client';
import TableTypeAccount from '@/app/components/forms/type-account/TableTypeAccount';
import TypeAccountGeneral from '@/app/components/forms/type-account/TypeAccountGeneral';
import { GeneralTypeAccount } from '@/lib/utils/type-account/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const revalidate = 0;

function TypeAccounts({
  typeAccounts,
}: {
  typeAccounts: GeneralTypeAccount[];
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get('create');
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  useEffect(() => {
    if (search) {
      setShowModalCreate(true);
    }
  }, [search]);
  return (
    <>
      {showModalCreate && (
        <TypeAccountGeneral setShowModalCreate={setShowModalCreate} />
      )}
      <TableTypeAccount
        typeAccounts={typeAccounts}
        setShowModalCreate={setShowModalCreate}
      />
    </>
  );
}

export default TypeAccounts;
