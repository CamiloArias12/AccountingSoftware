
import * as process from 'process' 

const env=process.env
export const configDB = {
	 type:'mysql',
	 host:env.HOST,
	 port:parseInt(process.env.PORT),
	 username:env.DATABASE_USER,
	 password:env.DATABASE_PASSWORD,
	 database:env.DATABASE_NAME,
	 keepConnectionAlive:true,
	 synchronize:true,
      } 



