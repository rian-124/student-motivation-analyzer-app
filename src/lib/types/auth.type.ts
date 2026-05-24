export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "lecturer" | "student";
  avatar?: string;
  student?: {
    id: string;
    nim: string;
    classId?: string;
    class?: {
      id: string;
      name: string;
    };
  };
  lecturer?: {
    id: string;
    nip: string;
    class?: {
      id: string;
      name: string;
    };
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Generic API wrapper matching backend TransformInterceptor / WebResponse<T>
export interface WebResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
