import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen.js';
import AcompanhantesScreen from './AcompanhantesScreen.js';
import PrevisoesScreen from './PrevisoesScreen.js';
import HistoricScreen from './HistoricScreen.js';

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
  
const Tab = createBottomTabNavigator();

export default class Aplicacao extends Component {
	constructor(props) {
		super(props);
		/*this.state = {
            data:''
		}*/
	}
	/*componentDidMount(){
		//const data = this.props.getParam('teste', 'some default value');
		const data = this.props.route.params;
		this.setState({data});
	}*/
	  render(){
		return (
		<NavigationContainer theme={MyTheme} independent={true}>
			<Tab.Navigator
			  screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color }) => {
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
				  return <Ionicons name={iconName} size={33} color={color} />;
				},
			  })}
			  tabBarOptions={{
				activeTintColor: 'rgba(255,180, 0, 0.5)',
				inactiveTintColor: '#909090',
				labelStyle: {
					fontSize: 13,
				},
			  }}
			>
			  <Tab.Screen name="Início" component={HomeScreen} initialParams={{ userData: this.props.route.params }} />
			  <Tab.Screen name="Acompanhantes" component={AcompanhantesScreen} initialParams={{ userData: this.props.route.params }} />
			  <Tab.Screen name="Previsões" component={PrevisoesScreen} initialParams={{ userData: this.props.route.params }} />
			  <Tab.Screen name="Histórico" component={HistoricScreen} initialParams={{ userData: this.props.route.params }} />
			  
			</Tab.Navigator>
		  </NavigationContainer>
		);
	  }
  }
