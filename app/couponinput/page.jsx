import React from 'react'
import Sidebar from '@/components/Sidebar'
import Coupons from '@/components/Coupons'

export default function page() {
  return (
    <>
      <div className='tw-flex'>
          <Sidebar />
          <Coupons/>
      </div>
    </>
  )
}
