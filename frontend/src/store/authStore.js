import { create } from 'zustand'; //zustand : state management lib
import axios from 'axios';
const API_URL = "http://localhost:3000"

axios.defaults.withCredentials = true // to just put cookies to the req header

export const authStore = create(
    (set) => (
        {
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
            isCheckingAuth: true,
            message: null,

            signup: async (email, password, name) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${API_URL}/api/auth/signup`, { email, password, name })
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false })
                } catch (error) {
                    set({ error: error.response.data.message || "Error Signing Up", isLoading: false })
                    throw error;
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null })
                } catch (error) {
                    set({ error: error.response?.data?.message || "Error logging in", isLoading: false })
                    throw error
                }
            },
            checkingAuth: async () => {
                set({ isCheckingAuth: true, error: null })
                try {
                    const response = await axios.get(`${API_URL}/api/auth/check-auth`);
                    set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
                } catch (error) {
                    set({ error: null, isCheckingAuth: false, isAuthenticated: false })
                }
            }


        }
    )
)