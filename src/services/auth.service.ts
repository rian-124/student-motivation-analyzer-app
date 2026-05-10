import api from '@/lib/axios';
import { AuthResponse, LoginCredentials, User } from '@/lib/types/auth.type';

export const authService = {
  // 1. Login - POST /auth/login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // 2. Logout - POST /auth/logout
  logout: async (): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/logout');
    return response.data;
  },

  // 3. Refresh Token - POST /auth/refresh
  refreshTokens: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response.data;
  },

  // 4. Get Profile - GET /users/me
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },
};
