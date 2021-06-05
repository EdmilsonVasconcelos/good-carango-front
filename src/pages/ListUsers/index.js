import React from 'react';

import GridContentMain from '../../components/GridContentMain';
import FullMenu from '../../components/FullMenu';
import ComponentListUsers from '../../components/ListUsers';

const ListUsers = () => {
  return (
    <GridContentMain
      ComponentLeft={FullMenu}
      ComponentRight={ComponentListUsers}
    />
  );
};

export default ListUsers;
