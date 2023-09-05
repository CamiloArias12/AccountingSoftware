"use client"

import React, { Component, useEffect } from 'react'
import anime from 'animejs';
import Logo from '../logo/Logo';

function SplashScreen (){
   
  const animationColor = () => {
     anime({
	 targets: '.st0',
	 fill:["#0A5F13"],
	 duration:100,
	 complete: () => {
	    animation()
	 }
     })
  } 

  const animation=() =>{
      anime({
	 targets: '.st0, .st1',
	 fill:["#FFFFFF","#FFFFFF","#BBDCBF","#8CCA92","#0DA11C","#0A5F13"],
	 stroke:["#8CCA92","#8CCA92","#0DA11C","#0A5F13"],
	 strokeDashoffset: [anime.setDashoffset, 0],
	 easing: 'cubicBezier(.5, .05, .1, .3)',
	 duration: 3000,
	 complete: () => {
	   animationColor() 
	 }
      });
   };

   useEffect(() => {
    animation() // Start the animation on component mount
    
      }, [])

    return (
    <div className="bg-white flex h-screen w-screen items-center justify-center ">
	 <Logo colorStroke="#BBDCBF" colorFill='none' className="st0 st1"/>
            </div>
         )
      }
export default SplashScreen;
