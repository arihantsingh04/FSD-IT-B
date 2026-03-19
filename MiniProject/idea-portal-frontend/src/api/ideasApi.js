import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || '/api';

export async function fetchIdeas(params = {}) {
  const res = await axios.get(`${BASE}/ideas`, { params });
  return res.data;
}

export async function createIdea(payload) {
  const res = await axios.post(`${BASE}/ideas`, payload);
  return res.data;
}

export async function voteIdea(id, delta = 1) {
  const res = await axios.post(`${BASE}/ideas/${id}/vote`, { delta });
  return res.data;
}

export async function updateStatus(id, status) {
  const res = await axios.patch(`${BASE}/ideas/${id}/status`, { status });
  return res.data;
}

export async function deleteIdea(id) {
  const res = await axios.delete(`${BASE}/ideas/${id}`);
  return res.data;
}
