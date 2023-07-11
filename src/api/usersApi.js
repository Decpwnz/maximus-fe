import mapBackendToFrontend from '../utils/backendMapper';
import api from './service';

const getUsers = async () => {
  const response = await api.get('/testDB');
  const backendData = response.data;
  const users = mapBackendToFrontend(backendData);
  return users;
};

export default getUsers;
