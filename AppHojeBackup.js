import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './z_aplicacao/login.js'

class HomeScreen extends React.Component {
	render(){ 
	  return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'left' }}>
      <Text>{this.props.message}</Text>
		</View>
	  );
	}
}
  //function PrevisoesScreen() {
class PrevisoesScreen extends React.Component {
	render(){
	  return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		  <Text>Previsões Futuras!</Text>
		</View>
	  );
	}
  }
  
  //function HistoricScreen() {
  class HistoricScreen extends React.Component {
	render(){
	  return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		  <Text>Histórico!</Text>
		</View>
	  );
	}
  }
  //function AcompanhantesScreen() {
  class AcompanhantesScreen extends React.Component {
	render(){
	  return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		  <Text>Acompanhantes!</Text>
		</View>
	  );
	}
  }

  const Tab = createBottomTabNavigator();

  export default class Aplicacao extends React.Component {
	  constructor(props) {
		  super(props);
	  }
	  render(){
		return (
		  <NavigationContainer>
			<Tab.Navigator
			  screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
				  let iconName;
	
				  if (route.name === 'Início') {
					iconName = focused
					  ? 'ios-heart-half'
					  : 'ios-heart-empty';
				  } else if (route.name === 'Previsões') {
					iconName = focused ? 'ios-eye' : 'ios-eye';
				  } else if (route.name === 'Histórico') {
					iconName = focused ? 'ios-time' : 'ios-timer';
				  } else if (route.name === 'Acompanhantes') {
					iconName = focused ? 'ios-contacts' : 'ios-people';
				  }
	
				  // You can return any component that you like here!
				  return <Ionicons name={iconName} size={size} color={color} />;
				},
			  })}
			  tabBarOptions={{
				activeTintColor: '#d1180c',
				inactiveTintColor: 'gray',
			  }}
			>
			  <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Início" component={HomeScreen} />
			  <Tab.Screen name="Acompanhantes" component={AcompanhantesScreen} />
			  <Tab.Screen name="Previsões" component={PrevisoesScreen} />
			  <Tab.Screen name="Histórico" component={HistoricScreen} />
			  
			</Tab.Navigator>
		  </NavigationContainer>
		);
	  }
  }