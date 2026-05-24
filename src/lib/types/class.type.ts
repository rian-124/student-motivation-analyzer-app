export interface Class {
  id: string;
  name: string;
  studyProgramId: string;
  studyProgram?: {
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
  };
  _count?: {
    students: number;
    lecturers: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ClassResponse {
  data: Class[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ClassLeaderboardStudent {
  studentId: string;
  name: string;
  nim: string;
  score: number;
  status: "HIGH" | "MEDIUM" | "LOW";
  rank: number;
}

export interface ClassLeaderboardData {
  classId: string;
  className: string;
  programId: string;
  programName: string;
  averageScore: number;
  totalStudents: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  students: ClassLeaderboardStudent[];
}
