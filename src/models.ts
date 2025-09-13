export interface Student {
  id: number;
  email: string;
  password_hash: string;
  name?: string;
  major?: string;
}

export interface Admin {
  id: number;
  email: string;
  password_hash: string;
  name?: string;
}

export interface Internship {
  id: number;
  student_id: number;
  company: string;
  position: string;
  start_date?: string;
  end_date?: string;
}
