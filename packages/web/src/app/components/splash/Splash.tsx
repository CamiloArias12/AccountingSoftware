'use client'

import React, { Component, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '../logo/Logo'

function SplashScreen() {
  const [isName, setIsName] = useState<boolean>(false)

  return (
    <motion.div className="bg-white h-screen flex flex-col items-center justify-center ">
      <Logo />
      {isName && <motion.div>Foncastel</motion.div>}
    </motion.div>
  )
}
export default SplashScreen
