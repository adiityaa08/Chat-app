import React from 'react'
import { useChatStore } from '../store/useChatStore'
import  Sidebar  from '../components/Sidebar'
import  NoChatSelected  from '../components/NoChatSelected'
import  ChatContainer  from '../components/ChatContainer'

const Homepage = () => {
  const {selectedUser}=useChatStore()
  return (
    <div className="h-lvh bg-base-200">
    <div className="flex items-center justify-center pt-20 px-4">
      <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-full h-[calc(100vh-5rem)]">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />

          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Homepage