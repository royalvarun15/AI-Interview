import React from 'react'
import DashboardProvider from './provider'

function DashboardLayout({ children }) {
  return (
    <div className='bg-gray-300'>
      <DashboardProvider>
        <div className='p-10'>
      {children}
      </div>
      </DashboardProvider>
      </div>
  )
}

export default DashboardLayout