export interface Student {
  id: string;
  nim: string;
  name: string;
  classId?: string;
  class?: {
    id: string;
    name: string;
  };
  semester?: string;
  userId: string;
  lecturerId?: string;
  lecturer?: {
    id: string;
    name: string;
    class?: {
      id: string;
      name: string;
    };
  };
  user?: {
    email: string;
    role: string;
  };
  _count?: {
    analyses: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StudentResponse {
  data: Student[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface CreateStudentPayload {
  nim: string;
  name: string;
  email: string;
  password: string;
  class?: string;
  semester?: string;
  lecturerId?: string;
}

export interface UpdateStudentPayload {
  nim?: string;
  name?: string;
  class?: string;
  semester?: string;
  lecturerId?: string;
}
