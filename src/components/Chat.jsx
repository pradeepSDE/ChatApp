import React from 'react'
import { useContext } from 'react'
import ChatContext from '../context/ChatContext'
import Messages from '../Messages'
import Inputmsg from './Inputmsg'
import Nochatselect from './Nochatselect'

const Chat = () => {

  const {data}=useContext(ChatContext)
  console.log(data)
  return (
    
    <div className='msgNavbar sticky top-0 z-9999 overflow-hidden'>
      {/* <!-- This is an example component --> */}
<div class=" mx-auto">
    
    {data.user.displayName && 
    <nav class="border-gray-200 w-full  bg-white border-2 border-slate-200   p-3.5 rounded-md">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
        <a href="#" class="flex">
        {/* <svg class="h-10 mr-3" width="51" height="70" viewBox="0 0 51 70" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z" fill="#76A9FA"></path><path d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z" fill="#A4CAFE"></path><path d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z" fill="#1C64F2"></path></g><defs><clipPath id="clip0"><rect width="51" height="70" fill="white"></rect></clipPath></defs></svg> */}
            <span class="self-center text-2xl font-semibold whitespace-nowrap">{data.user?.displayName}</span>
        </a>
        
        <div class="hidden md:block w-full md:w-auto" id="mobile-menu">
        <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            
      
        </ul>
        </div>
    </div>
    </nav>

    }
   
</div>

<script src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></script>
<Messages/>
<div className=''>

{data.user.displayName? <Inputmsg/>: <Nochatselect/>}
</div>
    </div>
  )
}

export default Chat
