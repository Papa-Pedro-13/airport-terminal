import axios from 'axios';

const API_URL = 'https://192.168.200.136/api';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data.token;
};

export const getWeather = async (token: string) => {
  const response = await axios.get(`${API_URL}/weather`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;

  // const response = await axios.get<Weather>('/weather.json', {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // return response.data;
};

export const getFlights = async (
  token: string,
  limit: number,
  offset: number
) => {
  const response = await axios.get(
    `${API_URL}/flights?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;

  // const response = await axios.get<Flights>(
  //   `/flights.json?limit=${limit}&offset=${offset}`,
  //   {
  //     headers: { Authorization: `Bearer ${token}` },
  //   }
  // );
  // return response.data;
};
