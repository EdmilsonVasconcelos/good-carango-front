import React from 'react';

import GridContentMain from '../../components/GridContentMain';
import FullMenu from '../../components/FullMenu';
import DashboardComponent from '../../components/Dashboard';

const Dashboard = () => {
  return (
    <GridContentMain
      ComponentLeft={FullMenu}
      ComponentRight={DashboardComponent}
    />
  );
};

export default Dashboard;
