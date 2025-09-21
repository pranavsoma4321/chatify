import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") || "false") === true,

    toggleSound: () => {
        set({ isSoundEnabled: !get().isSoundEnabled });
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    // Fixed function name
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load chats");
            set({ chats: [] });
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load contacts");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something Went Wrong");
        } finally {
            set({ isMessageLoading: false });
        }
    }
}));
