import api from "@/lib/axios";
import type {
  AuthTokens,
  LoginCredentials,
  User,
  WebResponse,
} from "@/lib/types/auth.type";

export const authService = {
  // 1. Login - POST /auth/login
  // Backend returns WebResponse<{ accessToken, refreshToken }>
  login: async (credentials: LoginCredentials): Promise<AuthTokens> => {
    const response = await api.post<WebResponse<AuthTokens>>(
      "/auth/login",
      credentials,
    );
    return response.data.data;
  },

  // 2. Logout - POST /auth/logout
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // 3. Refresh Token - POST /auth/refresh
  refreshTokens: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await api.post<WebResponse<AuthTokens>>(
      "/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    return response.data.data;
  },

  // 4. Get Profile - GET /users/me
  getProfile: async (): Promise<User> => {
    const response = await api.get<WebResponse<User>>("/users/me");
    return response.data.data;
  },
};
