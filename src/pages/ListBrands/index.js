import React from 'react';

import GridContentMain from '../../components/GridContentMain';
import FullMenu from '../../components/FullMenu';
import ComponentListBrands from '../../components/ListBrands';

const ListBrands = () => {
  return (
    <GridContentMain
      ComponentLeft={FullMenu}
      ComponentRight={ComponentListBrands}
    />
  );
};

export default ListBrands;
