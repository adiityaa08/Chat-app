import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axios';
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const res=await axiosInstance.get('/messages/users');
            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
          if (userId === 'ai-assistant') {
            set({ messages: [] });
            return;
          }
          const res = await axiosInstance.get(`/messages/${userId}`);
          set({ messages: res.data });
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          if (selectedUser._id === 'ai-assistant') {
            const userMessage = {
              _id: Date.now().toString(),
              text: messageData.text,
              senderId: 'me',
              createdAt: new Date().toISOString(),
            };
            set({ messages: [...messages, userMessage] });
    
            const res = await axiosInstance.post('/help/ask', {
              prompt: messageData.text,
            });
    
            const aiMessage = {
              _id: Date.now().toString() + '-ai',
              text: res.data.response,
              senderId: 'ai-assistant',
              createdAt: new Date().toISOString(),
            };
            set({ messages: [...get().messages, aiMessage] });
          } else {
            const res = await axiosInstance.post(
              `/messages/send/${selectedUser._id}`,
              messageData
            );
            set({ messages: [...messages, res.data] });
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
    },


    setSelectedUser: (user) => {
        set({selectedUser: user});
    },

    subscribeToMessages: () => {
      const { selectedUser } = get();
      if (!selectedUser) return;
  
      const socket = useAuthStore.getState().socket;
  
      socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return; 
        set({
          messages: [...get().messages, newMessage],
        });
      });
    },

    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },
    
}))