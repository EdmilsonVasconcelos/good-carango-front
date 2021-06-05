import React from 'react';

import GridContentMain from '../../components/GridContentMain';
import FullMenu from '../../components/FullMenu';
import ComponentListCars from '../../components/ListCars';

import SimpleMenu from '../../components/SimpleMenu';
import useToken from '../../hooks/useToken';

const ListCars = () => {
  const { isAuthenticated } = useToken();

  return (
    <GridContentMain
      ComponentLeft={isAuthenticated ? FullMenu : SimpleMenu}
      ComponentRight={ComponentListCars}
    />
  );
};

export default ListCars;
