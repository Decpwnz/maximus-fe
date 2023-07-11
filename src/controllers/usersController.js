import getUsers from '../api/usersApi';
import showNotification from '../utils/notification';

const usersController = {
  getUsers: async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      showNotification('Failed to get users', error);
      return null;
    }
  },
};

export default usersController;
