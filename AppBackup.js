import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { db } from './config.js';
let itemsRef = db.ref('utentes');
/*function readUserData() {
  db.ref('pulseiras/pulseira1/').on('value', function (snapshot) {
    console.log(snapshot.val())
});
const dados = readUserData();
}*/

//function HomeScreen() {
class HomeScreen extends React.Component {
  render(){ 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left' }}>
        <Dados>
        </Dados>
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

/*export default class App extends React.Component {
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

          <Tab.Screen name="Início" component={HomeScreen} />
          <Tab.Screen name="Acompanhantes" component={AcompanhantesScreen} />
          <Tab.Screen name="Previsões" component={PrevisoesScreen} />
          <Tab.Screen name="Histórico" component={HistoricScreen} />
          
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}*/

export default class App extends React.Component {
  state={
    email:"",
    password:""
  }
  render(){
    return (
      <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
    );
  }
}


//let itemsRef = db.ref('pulseiras/pulseira1');
class Dados extends React.Component {
  state = {
    items: []
  };
  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let id = snapshot.val().id;
      let cc = snapshot.val().cc;
      let prioridade = snapshot.val().prioridades.prioridade;
      let sala_num = snapshot.val().salas.sala.num;
      let sala_tempo = snapshot.val().salas.sala.tempo;
      let sala_proxima = snapshot.val().salas.sala.proxima;

      //let data = snapshot.val();
      //let items = Object.values(data);
      this.setState({ id, cc, prioridade, sala_num, sala_tempo, sala_proxima});
    });
  }
  render() {
    return (
      <React.Fragment>
        <Text>ID: {this.state.id}</Text>
        <Text>CC: {this.state.cc}</Text>
        <Text>Prioridades: {this.state.prioridade}</Text>
        <Text>Salas: {this.state.sala_num}</Text> 
        <Text>Tempo Demorado: {this.state.sala_tempo}</Text>
        <Text>Próxima Sala: {this.state.sala_proxima}</Text>
        <Text>Acompanhantes:</Text>
      </React.Fragment>
      
    );
  }
}