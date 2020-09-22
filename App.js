import React, { Component } from 'react';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './z_aplicacao/Login.js';
import Aplicacao from './z_aplicacao/aplicacao.js';

//reducer
/*import { Provider } from 'react-redux';
import { createStore } from 'redux';
import friendReducer from './store/reducers/DataReducer';

const store = createStore(friendReducer);*/
const Stack = createStackNavigator();

const MyTheme = {
	dark: true,
	colors: {
	  primary: '#575c66',
	  background: '#181818',
	  card: '#212121',
	  text: '#ffffff',
	  border: '#2E3440',
	},
  };

export default class App extends Component {
  render() {
    return (
      //<Provider store={ store }>
        <NavigationContainer theme={MyTheme} >
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Entrar'}}
            />
            <Stack.Screen name="Aplicacao" component={Aplicacao} />
          </Stack.Navigator>
        </NavigationContainer>
      //</Provider>
    );
  }
}
