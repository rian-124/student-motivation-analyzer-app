export interface Program {
  id: string;
  code: string;
  name: string;
  degreeLevel: string;
  departmentId: string;
  department?: {
    id: string;
    code: string;
    name: string;
  };
  _count?: {
    classes: number;
    students: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProgramResponse {
  data: Program[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
