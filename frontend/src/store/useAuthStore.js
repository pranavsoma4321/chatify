import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    onlineUsers: [],
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in authCheck:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data); // matches backend
            set({ authUser: res.data });
            toast.success("Account created successfully!");
        } catch (error) {
            console.error("Signup error full:", error); // will now show detailed info
            toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (credentials) => {
        set({ isLoggingIn: true });

        try {
            const response = await axiosInstance.post("/auth/login", credentials);
            const userData = response.data;

            set({ authUser: userData });
            toast.success("✅ Logged in successfully");

            // Connect socket only if login is successful
            if (get().connectSocket) {
                get().connectSocket();
            }

        } catch (error) {
            console.error("Login error:", error);

            // Handle server-side or network errors gracefully
            const errorMessage =
                error.response?.data?.message || "Something went wrong. Please try again.";

            toast.error(errorMessage);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null })
            toast.success("logged out successfully")
        } catch (error) {
            toast.error("Error logging out");
            console.log("logout error", error);
        }
    },

    updateProfile: async (data) => {
        try {
            let formData = new FormData();

            // append all fields
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const res = await axiosInstance.put("/auth/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile:", error);
            const message = error.response?.data?.message || "Failed to update profile";
            toast.error(message);
        }
    }

}));



