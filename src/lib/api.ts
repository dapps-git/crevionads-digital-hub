const configuredApiUrl = import.meta.env.VITE_API_URL;
const fallbackApiUrl = import.meta.env.PROD
  ? 'https://crevionads-backend.onrender.com/api'
  : 'http://localhost:5002/api';

const rawApiUrl = (configuredApiUrl || fallbackApiUrl).replace(/\/$/, '');

// Ensure that the API base URL always ends with '/api' to match the backend routing
export const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

export const fetchServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
};

export const fetchWorks = async () => {
  const response = await fetch(`${API_BASE_URL}/works`);
  if (!response.ok) throw new Error('Failed to fetch works');
  return response.json();
};

export const fetchWorkById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/works/${id}`);
  if (!response.ok) throw new Error('Failed to fetch work');
  return response.json();
};

export const fetchBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

export const fetchServiceBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/services/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch service');
  return response.json();
};

export const fetchBlogBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};
