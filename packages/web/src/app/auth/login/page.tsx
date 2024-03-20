'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import SplashScreen from '@/app/components/splash/Splash'

export default function Login() {
  const [splash, setSplash] = useState(false)
  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const route = useRouter()
  const [error, setError] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setSplash(true)
    }, 2000)
  }, [])
  const { status, data } = useSession()
  if (status === 'authenticated' && data && splash) {
    route.push('/dashboard')
  }
  if (splash && status === 'unauthenticated') {
    return (
      <div className="flex flex-row h-screen w-screen  items-center justify-centerr bg-white">
        <div className=" bg-cover hidden md:flex flex-grow md:w-auto h-screen  bg-img-bg " />
        <div className="   flex p-2 md:p-10 w-screen md:max-w-[400px] lg:max-w-[600px] flex-col items-center justify-center">
          <div className="flex flex-row  justify-center items-center md:pt-8 md:pb-14 md:px-10 ">
            <img className=" h-14 md:h-20 md:pr-4 pr-10" src="/foncaster.png" />
            <img
              className=" h-16 md:h-20 border-l border-black md:p-4 md:pl-10  "
              src="/logoName.png"
            />
          </div>

          <div className=" flex   flex-col   w-full md:m-8 justify-center  ">
            <div className="flex flex-col  justify-center pt-10">
              <label className="pb-3 font-bold text-[#1A5DAD] ">Usuario </label>
              <input
                onChange={e => setEmail(e.target.value)}
                className=" bg-[#DEE2E9]  rounded-[10px] border border-white p-2 "
              />
            </div>
            <div className="flex flex-col w-full justify-center py-10">
              <label className="pb-3 font-bold text-[#1A5DAD] ">
                Contraseña
              </label>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                className="bg-[#DEE2E9] rounded-[10px] border border-white p-2 "
              />
            </div>
            {error && (
              <label className="text-[#FF0000]">Datos incorrectos</label>
            )}
            <div className="flex justify-center py-10 ">
              <button
                onClick={async () => {
                  const query = await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false,
                    callbackUrl: '/dashboard'
                  })
                    .then(data => {
                      if (data.error) {
                        setError(true)
                      }
                    })
                    .catch(e => {
                      console.log('Error', e)
                    })
                }}
                className="bg-[#1A5DAD] text-white h-[59px]  rounded-lg hover:shadow-lg w-full "
              >
                Iniciar sesion{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <SplashScreen />
      </div>
    )
  }
}
