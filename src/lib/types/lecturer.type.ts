export interface Lecturer {
  id: string;
  nip: string;
  name: string;
  classId?: string;
  supervisedClassIds?: string[];
  supervisedClasses?: string[];
  class?: {
    id: string;
    name: string;
  };
  userId: string;
  user?: {
    email: string;
    role: string;
  };
  _count?: {
    students: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LecturerResponse {
  data: Lecturer[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateLecturerPayload {
  nip: string;
  name: string;
  email: string;
  password: string;
  classIds?: string[];
}

export interface UpdateLecturerPayload {
  nip?: string;
  name?: string;
  email?: string;
  password?: string;
  classIds?: string[];
}
