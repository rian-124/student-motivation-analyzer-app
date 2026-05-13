export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'lecturer' | 'student';
  student?: {
    id: string;
    nim: string;
    classId?: string;
  };
  lecturer?: {
    id: string;
    nip: string;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Generic API wrapper matching backend WebResponse<T>
export interface WebResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  errors?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}