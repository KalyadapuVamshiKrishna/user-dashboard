import axios from 'axios';

// The URL where your Node.js backend is running
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export const api = {
  getUsers: () => apiClient.get('/users').then(res => res.data),
  getUser: (id: string) => apiClient.get(`/users/${id}`).then(res => res.data),
  createUser: (data: any) => apiClient.post('/users', data).then(res => res.data),
  updateUser: (id: string, data: any) => apiClient.put(`/users/${id}`, data).then(res => res.data),
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`).then(res => res.data),
};