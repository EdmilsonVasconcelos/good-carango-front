import React from 'react';

import GridContentMain from '../../components/GridContentMain';
import FullMenu from '../../components/FullMenu';
import FormChangePassword from '../../components/FormChangePassword';

const ChangePassword = () => {
  return (
    <GridContentMain
      ComponentLeft={FullMenu}
      ComponentRight={FormChangePassword}
    />
  );
};

export default ChangePassword;
