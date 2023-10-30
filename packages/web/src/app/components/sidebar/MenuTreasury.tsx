'use client';
import { useRouter } from 'next/navigation';
import { AddSvg } from '../logo/Add';

import { motion } from 'framer-motion';
import { TreasurySideBar } from '@/lib/utils/MenuTreasury';
import { MenuSidebar } from '@/lib/utils/SidebarOptions';

function MenuTreasury({
  toggleBar,
  setSelect,
}: {
  toggleBar: boolean;
  setSelect: any;
}) {
  const router = useRouter();
  return (
    <>
      <div className={`my-3 `}>
        {TreasurySideBar.map((sidebar) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            key={sidebar.name}
            className={`w-full flex flex-row justify-betwen ${
              !toggleBar && ' hover:pb-1 hover:border-b-[1px]'
            }  my-5 `}
          >
            <div
              className={`${
                toggleBar && 'flex flex col items-center justify-center'
              } w-full flex flex-row`}
              onClick={() => {
                setSelect(MenuSidebar.treasury);
                router.push(sidebar.href);
              }}
            >
              <motion.div
                whileHover={{ scale: 2 }}
                className={`h-4 w-4
      
						${toggleBar && 'h-8 w-8 p-2'} `}
              >
                <img src={sidebar.icon} />
              </motion.div>
              {!toggleBar && (
                <label className=" font-sans text-[13px] pl-2">
                  {sidebar.name}
                </label>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default MenuTreasury;
