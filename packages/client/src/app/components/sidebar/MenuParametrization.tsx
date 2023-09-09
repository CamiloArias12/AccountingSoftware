import { ParametrizationSideBar } from "@/lib/utils/MenuParametrization"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddSvg } from "../logo/Add";

import { delay, motion } from "framer-motion";

function MenuParametrization({ toggleBar }: { toggleBar: boolean }) {

	const router = useRouter()
	return (
		<div className="my-3 ml-5 p-3">
			{ParametrizationSideBar.map((sidebar) => (
				<div key={sidebar.name} className={`w-full flex flex-row justify-betwen   ${!toggleBar && "hover:shadow"}  py-5 `}>
					<div className={`${toggleBar && ""} w-full flex flex-row`} onClick={() => {
						router.push(sidebar.href)
					}}>
						<div className="h-4 w-4 ">
							<img src={sidebar.icon} />
						</div>
						{!toggleBar &&
							<label className="text-xs pl-2">{sidebar.name}</label>
						}
					</div>
					{!toggleBar &&
						<motion.div   
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{duration: 0.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
						className="rounded-[50%] bg-[#006AE7] p-1" onClick={ () => {
						      router.push(`${sidebar.href}/create`)}
						}>
							<AddSvg color="#ffffff" />
						</motion.div>

					}
				</div>
			))}
		</div>

	);

}

export default MenuParametrization
