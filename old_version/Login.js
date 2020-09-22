import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
//import { connect } from 'react-redux'; //redux

import { db } from '../config.js'; //acesso a base de dados 
const screenHeight= Dimensions.get("window").height;

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: screenHeight*0.15
  },
  textInput: {
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 0,
    borderRadius: 50,
    height: 50,
    fontSize: 25,
    paddingLeft: 40,
    color: 'rgba(255,180, 0, 1)',
    marginBottom: 30
  },
  loginButton: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(255,180, 0, 0.5)',
    backgroundColor: 'rgba(255,180, 0, 0.2)',
    padding: 15,
    margin: 5
  },
  loginButtonText: {
    color: 'rgba(255,255, 255, 1)',
    fontSize: 20,
    textAlign: 'center'
  },
  loginErrorText:{
    color: '#fc0040',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    //this.state = { cc_introduzido: '', idPulseira_introduzido: '',message: '' }
    this.state = { cc_introduzido: '', idPulseira_introduzido: '', message: '' }
    //this.props.navigation.navigate('Aplicacao', { idPulseira: this.state.idPulseira_introduzido, cc: this.state.cc_introduzido});

    this.atualizar_cc_introduzido = this.atualizar_cc_introduzido.bind(this);
    this.atualizar_idPulseira_introduzido = this.atualizar_idPulseira_introduzido.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  atualizar_cc_introduzido(cc_introduzido) {
    this.setState({ cc_introduzido });
  }
  atualizar_idPulseira_introduzido(idPulseira_introduzido) {
    this.setState({ idPulseira_introduzido });
  }
  async handleSubmit() { //login => verificar cc e pulseira à base de dados
    // Create a reference
    const ref = db.ref(`/utentes/${this.state.idPulseira_introduzido}`);
    
    // Fetch the data snapshot
    const snapshot = await ref.once('value');


    if(!snapshot.exists())
      this.setState({message: 'Dados incorretos, verifique novamente!'});
    else if (snapshot.val().cc != this.state.cc_introduzido)
      this.setState({message: 'Dados incorretos, verifique novamente!'});
    else {
      this.props.navigation.navigate('Aplicacao', { idPulseira: this.state.idPulseira_introduzido, cc: this.state.cc_introduzido});
    }
  }
  render() {
    return (
        <ScrollView style={{padding: 20}}>
          <View style={styles.inputContainer}>
            <Image
              style={{width: screenHeight*0.2, height:screenHeight*0.2, alignSelf: 'center', marginBottom: 40}}
              source={require('./logo_teste1.png')}
              //source={{uri:'https://image.flaticon.com/icons/png/512/33/33198.png'}}
              
            />
            <TextInput style={styles.textInput}
              placeholder="Cartão de Cidadão"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              value={this.state.cc_introduzido}
              onChangeText={this.atualizar_cc_introduzido}
            />
            <TextInput style={styles.textInput}
              placeholder="Id da Pulseira"
              maxLength={20}
              onBlur={Keyboard.dismiss}
              value={this.state.idPulseira_introduzido}
              onChangeText={this.atualizar_idPulseira_introduzido}
            />

            <Text style={styles.loginErrorText}>{this.state.message}</Text>

            <TouchableOpacity style={styles.loginButton} onPress={this.handleSubmit}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    )
  }
}

/*const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};

export default connect(mapStateToProps)(Login);*/