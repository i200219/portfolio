"use client"

import React, { useState, useRef } from "react"

const TooltipProvider = ({ children }) => {
  return <>{children}</>
}

const Tooltip = ({ children }) => {
  return <>{children}</>
}

const TooltipTrigger = ({ asChild, children, ...props }) => {
  return React.cloneElement(children, props)
}

const TooltipContent = ({ children, className, ...props }) => {
  return (
    <div 
      className={`z-50 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1c1c1c] text-white px-3 py-1.5 text-sm rounded-md shadow-md ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
