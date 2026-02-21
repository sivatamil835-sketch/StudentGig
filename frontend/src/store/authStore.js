import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const useAuthStore = create((set) => ({
    user: null,
    session: null,
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, error: error.message };
        }
        set({ user: data.user, session: data.session, isLoading: false });
        return { success: true };
    },

    register: async ({ email, password, name, role, company }) => {
        set({ isLoading: true, error: null });
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name, role, company_name: company || '' } },
        });
        if (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, error: error.message };
        }
        set({ user: data.user, session: data.session, isLoading: false });
        return { success: true };
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
    },

    loadSession: async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            set({ user: data.session.user, session: data.session });
        }
    },
}));

export default useAuthStore;
