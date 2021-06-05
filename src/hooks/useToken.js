import { useContext } from 'react';

import TokenContext from '../contexts/token';

const useToken = () => {
  const { token, setToken } = useContext(TokenContext);

  const updateToken = token => {
    sessionStorage.setItem('TOKEN_USER', token);
    setToken(token);
  };

  return { isAuthenticated: !!token, token, updateToken };
};

export default useToken;
