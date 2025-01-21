import axios from 'axios';

const API_BASE_URL = 'https://digitalpivot-backend.azurewebsites.net/api';

export const fetchStocks = async () => {
  const response = await axios.get(`${API_BASE_URL}/stocks/mystocks`);
  return response.data;
};

export const fetchStockDetails = async (stockId) => {
  const response = await axios.get(`${API_BASE_URL}/stocks/${stockId}/history/e`);
  return response.data;
};
