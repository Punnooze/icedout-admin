import React from 'react'
import Sidebar from '@/components/Sidebar'
import ProductPage from '@/components/ProductPage'


export default function page() {
  return (
    <>
      <div className='tw-flex'>
          <Sidebar />
          <ProductPage/>
      </div>
    </>
  )
}
