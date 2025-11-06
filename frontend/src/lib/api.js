import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobAPI = {
  getJobs: () => api.get('/jobs'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  addJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

export const resumeAPI = {
  getResumes: () => api.get('/resumes'),
  get: (id) => api.get(`/resumes/${id}`),
  addResume: (resumeData) => api.post('/resumes', resumeData),
  updateResume: (id, resumeData) => api.put(`/resumes/${id}`, resumeData),
  deleteResume: (id) => api.delete(`/resumes/${id}`),
};

export const analyticsAPI = {
  getAnalytics: () => api.get('/analytics'),
};

export default api;
