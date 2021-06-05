import React from 'react';

import GridContentMain from '../../components/GridContentMain';
import FullMenu from '../../components/FullMenu';
import FormUpdateCar from '../../components/FormUpdateCar';

const UpdateCar = () => {
  return (
    <GridContentMain ComponentLeft={FullMenu} ComponentRight={FormUpdateCar} />
  );
};
export default UpdateCar;
