const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function postJson(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function postForm(endpoint: string, data: FormData) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: data,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  student: {
    login: (data: any) => postJson('/api/auth/student/login', data),
    register: (data: any) => postJson('/api/auth/student/register', data),
    profile: (data: any) => postJson('/api/student/profile', data),
    uploadResume: (data: FormData) => postForm('/api/student/resume', data),
  },
  company: {
    login: (data: any) => postJson('/api/auth/company/login', data),
    register: (data: any) => postJson('/api/auth/company/register', data),
    createInternship: (data: any) => postJson('/api/company/internships', data),
  },
  admin: {
    login: (data: any) => postJson('/api/auth/admin/login', data),
    smartAllocation: () => postJson('/api/admin/smart-allocation', {}),
  },
  chatbot: {
    message: (data: any) => postJson('/api/chatbot/message', data),
    analyzeResume: (data: FormData) => postForm('/api/chatbot/analyze-resume', data),
  },
};
