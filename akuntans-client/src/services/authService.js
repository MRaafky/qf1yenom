import api from './api';

// Auth service untuk handle authentication
const authService = {
    // Login user
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            // Simpan token ke localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get current token
    getToken: () => {
        return localStorage.getItem('token');
    },
};

export default authService;
