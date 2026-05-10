export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'LECTURER' | 'STUDENT';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}