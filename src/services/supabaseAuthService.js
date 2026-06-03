import { supabase } from '../lib/supabase';

export const authService = {
  // Sign up with email and password
  signUp: async (email, password, name) => {
    // 1. First, reliably check if the email exists using a secure RPC call
    const { data: emailExists } = await supabase.rpc('check_email_exists', {
      check_email: email
    });

    if (emailExists) {
      throw new Error("User already registered");
    }

    // 2. If it doesn't exist, proceed with normal sign up
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          role: 'user',
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    
    return data;
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Request password reset
  resetPasswordForEmail: async (email) => {
    // 1. First check if the email exists using our secure RPC
    const { data: emailExists } = await supabase.rpc('check_email_exists', {
      check_email: email
    });

    if (!emailExists) {
      throw new Error("User does not exist");
    }

    // 2. If it exists, send the reset link
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) throw error;
    return data;
  },

  // Update password (after user clicks reset link and gets authenticated)
  updatePassword: async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  // Get user profile from profiles table
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Listen to auth state changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export default authService;
