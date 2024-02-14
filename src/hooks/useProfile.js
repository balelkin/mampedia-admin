import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../services/http.service';
import TokenService from '../services/token.service';
import UserContext from './context/UserContext';
import useAuth from './useAuth';

export default function useProfile() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const { loginUser } = useAuth();
  const prepareProfile = async (values = {}) => {
    const { avatar, department, goal } = values;

    try {
      await axios.post('/goals/prepare-profile', {
        avatar,
        department: department.name,
        goal,
      });
      TokenService.clearTokens();
      loginUser();
      const updatedTokenRes = await axios.post('/auth/refresh-token', {
        refreshToken: TokenService.getLocalRefreshToken(),
      });
      TokenService.updateLocalAccessToken(updatedTokenRes.accessToken);
      const updatedUserRes = await axios.get('/auth/token');
      setUser(updatedUserRes);
      history.push('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return { prepareProfile };
}
