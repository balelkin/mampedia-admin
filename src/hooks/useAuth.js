import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../services/http.service';
import TokenService from '../services/token.service';
import UserContext from './context/UserContext';

export default function useAuth() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = async () => {
    const accessToken = TokenService.getAccessToken();

    if (!accessToken) {
      return setError('No access token provided.');
    }

    return axios
      .get('/auth/token')
      .then((res) => {
        setUser(res);
        return history.push('/home');
      })
      .catch((err) => setError(err.response.data));
  };

  const loginUser = async () => {
    window.location.href = '/api/v1/auth/login-hydra';
    await setUserContext();
  };

  return {
    loginUser,
    error,
  };
}
