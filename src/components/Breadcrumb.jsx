import React from 'react'

export default function Breadcrumb({active}) {
  return (
    <div className='flex gap-3 items-center'>
      <span>Home</span>
      <span className='h-6 w-0.5 rotate-[20deg] bg-black'></span>
      <span className='relative after:absolute after:w-full after:block after:h-3 after:bg-as-yellow after:top-3 after:-z-10 font-bold'>{active}</span>
    </div>
  )
}
