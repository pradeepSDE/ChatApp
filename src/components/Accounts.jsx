import React from 'react'

const Accounts = () => {
  return (
    <div>
     <div class="h-screen flex flex-col">
  <div class="bg-blue-500 text-white p-4 flex items-center justify-center">
    Top content
  </div>
  <div class="flex-grow">
    <div class="bg-gray-200 px-4 py-8">
      Main content
    </div>
  </div>
  <div class="bg-green-500 text-white p-4 flex items-center justify-center">
    Bottom content
  </div>
</div>
    </div>
  )
}

export default Accounts
