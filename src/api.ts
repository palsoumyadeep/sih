const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let token: string | null = null;

async function request(endpoint: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {};
  if (options.headers) Object.assign(headers, options.headers as any);
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function postJson(endpoint: string, data: any) {
  return request(endpoint, { method: 'POST', body: JSON.stringify(data) });
}

async function postForm(endpoint: string, data: FormData) {
  return request(endpoint, { method: 'POST', body: data });
}

async function getJson(endpoint: string) {
  return request(endpoint, { method: 'GET' });
}

export const api = {
  student: {
    login: async (data: any) => {
      const res = await postJson('/api/auth/student/login', data);
      token = res.token;
      return res.student;
    },
    register: async (data: any) => {
      const res = await postJson('/api/auth/student/register', data);
      token = res.token;
      return res.student;
    },
    profile: (data: any) => postJson('/api/student/profile', data),
    uploadResume: (data: FormData) => postForm('/api/student/resume', data),
    myInternship: () => getJson('/api/student/internship'),
  },
  company: {
    login: async (data: any) => {
      const res = await postJson('/api/auth/company/login', data);
      token = res.token;
      return res.company;
    },
    register: async (data: any) => {
      const res = await postJson('/api/auth/company/register', data);
      token = res.token;
      return res.company;
    },
    createInternship: (data: any) => postJson('/api/company/internships', data),
  },
  internships: {
    list: () => getJson('/api/internships'),
  },
  admin: {
    login: async (data: any) => {
      const res = await postJson('/api/auth/admin/login', data);
      token = res.token;
      return res.admin;
    },
    stats: () => getJson('/api/admin/stats'),
    smartAllocation: () => postJson('/api/admin/smart-allocation', {}),
  },
  chatbot: {
    message: (data: any) => postJson('/api/chatbot/message', data),
    analyzeResume: (data: FormData) => postForm('/api/chatbot/analyze-resume', data),
  },
};
