"use client"

import React, { Component, useEffect, useState } from 'react'
import anime from 'animejs';
import {motion} from "framer-motion"
import Logo from '../logo/Logo';

function SplashScreen (){
  
   const [isName,setIsName]=useState<boolean>(false)

  const animation=() =>{
      anime({
	 targets: '.st0, .st1',
	 stroke:["#0A5F13"],
	 strokeDashoffset: [anime.setDashoffset, 0],
	 easing: 'cubicBezier(.5, .05, .1, .3)',
	 duration: 2500,
	 complete: () => {
	    setIsName(!isName)
	 }
      });
   };

   useEffect(() => {
    animation() // Start the animation on component mount
    
      }, [])

    return (
	 <motion.div
	       animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 5,
                    delay: 0.3,
                    ease: [0.5, 0.71, 1, 1.5],
                }}
                initial={{ opacity: 0}}
	       className="bg-white flex flex-col h-screen w-screen items-center justify-center ">
	    <Logo colorStroke="#BBDCBF" colorFill='none' className="st0 st1"/>
	 {isName &&
	  <motion.div>
	     Foncastel
	  </motion.div>
	  }
         </motion.div>
         )
      }
export default SplashScreen;
