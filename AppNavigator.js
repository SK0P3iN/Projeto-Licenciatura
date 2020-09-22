//import { createStackNavigator } from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './z_aplicacao/Login.js';
import Aplicacao from './z_aplicacao/aplicacao.js';

const AppNavigator = createStackNavigator({
  Log: Login,
  Aplic: Aplicacao,
  },
  {
    initialRouteName: 'Log',
  });

export default AppNavigator;