import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('ruralhelp_user') || 'null'),
  token: localStorage.getItem('ruralhelp_token') || null,
  isAuthenticated: !!localStorage.getItem('ruralhelp_token'),

  login: (userData, token) => {
    localStorage.setItem('ruralhelp_user', JSON.stringify(userData));
    localStorage.setItem('ruralhelp_token', token);
    set({ user: userData, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('ruralhelp_user');
    localStorage.removeItem('ruralhelp_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (userData) => {
    localStorage.setItem('ruralhelp_user', JSON.stringify(userData));
    set({ user: userData });
  }
}));
