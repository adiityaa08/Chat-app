import { useEffect , useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Radio } from 'lucide-react'; 


const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);


    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;


    if(isUsersLoading) return <SidebarSkeleton/>;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-4">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-semibold hidden lg:block text-xl pl-1">Contacts</span>
          </div>

          
          <button
          onClick={() =>
            setSelectedUser({
              _id: "ai-assistant",
              fullName: "Gemini AI",
              profilePic: "/ai.jpeg",
            })
          }
          className={`w-full p-3 pl-0 flex items-center gap-3 hover:bg-base-300 transition-colors ${
            selectedUser?._id === "ai-assistant"
              ? "bg-base-300 ring-1 ring-base-300"
              : ""
          }`}
        >
          <div className="relative">
            <img
              src="/ai.jpeg"
              alt="Gemini"
              className="size-8 object-cover rounded-full"
            />
          </div>
          <div className="hidden lg:block text-left min-w-0">
            <div className="font-bold truncate">Gemini AI</div>
            <div className="text-sm text-zinc-400">AI Assistant</div>
          </div>
        </button>
        

          {/* online users */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs overflow-hidden">

                {/* Mobile view: icon-only toggle */}
                <label className="sm:hidden cursor-pointer flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={showOnlineOnly}
                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    className="hidden" // hide native checkbox but keep functionality
                  />
                  <Radio
                    size={16}
                    className={`text-green-400 ${showOnlineOnly ? 'opacity-100' : 'opacity-60'}`}
                  />
                  <span className="text-white-500">({onlineUsers.length - 1})</span>
                </label>

                {/* Desktop view: checkbox with label and full count */}
                <label className="hidden sm:flex cursor-pointer items-center gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={showOnlineOnly}
                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    className="checkbox checkbox-xs"
                  />
                  <span className="text-xs">Show online only</span>
                  <span className="text-white-500">({onlineUsers.length - 1} online)</span>
                </label>
                </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-2 flex items-center gap-3 hover
              ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-light truncate">{user.fullName}</div>
              <div className="text-xs text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        </div>
    </aside>
  )
}

export default Sidebar