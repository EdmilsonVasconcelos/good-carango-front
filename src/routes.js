import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import AddUser from './pages/AddUser';
import AddCar from './pages/AddCar';
import AddBrand from './pages/AddBrand';
import ListCars from './pages/ListCars';
import ListBrands from './pages/ListBrands';
import ListUsers from './pages/ListUsers';
import Dashboard from './pages/Dashboard';
import UpdateBrand from './pages/UpdateBrand';
import UpdateCar from './pages/UpdateCar';
import ChangePassword from './pages/ChangePassword';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Progress from './components/Progress';

export default function Routes() {
  return (
    <Router>
      <Header />
      <Progress />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/add-user">
          <AddUser />
        </Route>
        <Route exact path="/list-cars">
          <ListCars />
        </Route>
        <ProtectedRoute path="/add-car" component={AddCar} />
        <ProtectedRoute path="/add-brand" component={AddBrand} />
        <ProtectedRoute path="/edit-brand/:idBrand" component={UpdateBrand} />
        <ProtectedRoute path="/list-brands" component={ListBrands} />
        <ProtectedRoute path="/list-users" component={ListUsers} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/edit-car/:idCar" component={UpdateCar} />
        <ProtectedRoute path="/change-password" component={ChangePassword} />
      </Switch>
    </Router>
  );
}
