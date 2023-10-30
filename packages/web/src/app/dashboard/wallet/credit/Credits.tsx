'use client';

import TableCredits from '@/app/components/forms/credit/TableCredit';
import { Credit } from '@/lib/utils/credit/types';

export const revalidate = 0;

function Credits({ credits }: { credits: Credit[] }) {
  return (
    <div className="flex flex-col flex-grow mx-4 ">
      <div className="flex flex-grow flex-col bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <TableCredits credits={credits} />
      </div>
    </div>
  );
}

export default Credits;
