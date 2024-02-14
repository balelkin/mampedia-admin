import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../services/http.service';
import TokenService from '../services/token.service';
import UserContext from './context/UserContext';

export default function useLogout() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const logoutUser = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: 'auth/logout',
      }).then(() => {
        TokenService.clearTokens();
        setUser(null);
        return history.push('/login');
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { logoutUser };
}
