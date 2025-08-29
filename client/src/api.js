
import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
const api = axios.create({ baseURL: API_BASE })

export const getPortfolios = async (params={}) => {
  const res = await api.get('/portfolios', { params })
  return res.data
}

export const getPortfolio = async (id) => {
  const res = await api.get(`/portfolios/${id}`)
  return res.data
}

export const createPortfolio = async (payload) => {
  const res = await api.post('/portfolios', payload)
  return res.data
}

export const updatePortfolio = async (id, payload) => {
  const res = await api.put(`/portfolios/${id}`, payload)
  return res.data
}
export const deletePortfolio = async (id) => {
  const res = await api.delete(`/portfolios/${id}`);
  return res.data;
};
