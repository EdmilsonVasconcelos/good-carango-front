import React from 'react';

import GridContentMain from '../../components/GridContentMain';
import SimpleMenu from '../../components/SimpleMenu';
import FormLogin from '../../components/FormLogin';

const Login = () => {
  return (
    <GridContentMain ComponentLeft={SimpleMenu} ComponentRight={FormLogin} />
  );
};
export default Login;
