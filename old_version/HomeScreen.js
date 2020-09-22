import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, Label, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../config.js'; //acesso a base de dados 

import { ProgressCircle } from 'react-native-svg-charts'

const screenWidth = Dimensions.get("window").width;

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = { prioridade: '', sala: '', n_acompanhantes: 0, nome: '', cc: '' }
	}

	_addButton(){
		Alert.alert('INFORMAÇÃO','Em desenvolvimento...\nDesculpe!')
	}

	async componentDidMount(){
		// Create a reference
		const ref = db.ref(`/utentes/${this.props.route.params?.userData.idPulseira}`);
		
		// Fetch the data snapshot
		//const snapshot = await ref.on('value');
		var that = this;
		let priori = "";
		let n_acomp ="";
		let nome_utente = "";
		let cc_utente = "";
		let n_sala ="";
		
		ref.on('value', function (snapshot) {
			priori = snapshot.val().prioridade;
			n_acomp = snapshot.child("acompanhantes").numChildren();
			nome_utente = snapshot.val().nome;
			cc_utente = snapshot.val().cc;
			n_sala = snapshot.val().sala;
			
			that.setState({ prioridade: priori, sala: n_sala, n_acompanhantes: n_acomp, nome: nome_utente, cc: cc_utente });
		});
		//this.setState({ prioridade: priori });

	}
    render(){ 
        return (
			<ScrollView>
			<View  style={styles.containerGeral}>
				<View style={styles.container}>
					<ProgressCircle style={{ width: screenWidth*0.4, height: 200}} backgroundColor={'#0a2918'} cornerRadius={45} strokeWidth={13} progress={this.state.n_acompanhantes/10} progressColor={'rgb(44, 174, 102)' }>
						<View>
							<Text style={{ color: "rgb(44, 174, 102)", fontSize: 40, fontWeight: 'bold', textAlign: 'center', paddingTop:55 }}> {this.state.n_acompanhantes}/10 </Text>
							<Ionicons style={{textAlign: 'center', paddingTop:10}} name="ios-people" size={32} color="rgb(44, 174, 102)" />
						</View>
					</ProgressCircle>
					<Text>{'	'}</Text>
					<ProgressCircle style={{ width: screenWidth*0.41, height: 200}} backgroundColor={'#0a2918'} cornerRadius={45} strokeWidth={13} progress={0.6} progressColor={'rgb(44, 174, 102)' }>
						<View>
							<Text style={{ color: "rgb(44, 174, 102)", fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop:50 }}> 00:48h</Text>
							<Text style={{ color: "rgb(44, 174, 102)", fontSize: 6, fontWeight: 'bold', textAlign: 'center'}}> ___________________________</Text>
						
							<Text style={{ color: "rgb(44, 174, 102)", fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> 01:20h</Text>
							<Ionicons style={{textAlign: 'center', paddingTop:5}} name="ios-clock" size={32} color="rgb(44, 174, 102)" />
						
						</View>
					</ProgressCircle>
				</View>

				<View style={[(this.state.prioridade[this.state.prioridade.length-1] === "alta") ?
						styles.viewPrioridadeAlta : (this.state.prioridade[this.state.prioridade.length-1] === "media") ?
						styles.viewPrioridadeMedia : styles.viewPrioridadeBaixa
				]}>
					<View style={{alignSelf:'center', backgroundColor: "rgba(255, 255, 255, 0.2)", borderWidth:0, padding: 15, marginBottom: 10, borderRadius: 20}}>
                        <Text style={{fontSize: 44, color: '#000'}}>{this.state.sala}</Text>
                        <Text style={{fontSize: 12, color: '#000', position:'absolute', alignSelf: 'center'}}>Sala</Text>
						<Text style={{fontSize: 12, color: '#000', position:'absolute', alignSelf: 'center', paddingTop:65}}>atual</Text>
                    </View>

					<Text style={{textAlign: 'center', fontWeight: 'normal', fontSize: 20, color: '#fff'}}> 
						Prioridade: {'		'}
						<Text style={[(this.state.prioridade[this.state.prioridade.length-1] === "alta") ?
								styles.textPrioridadeAlta : (this.state.prioridade[this.state.prioridade.length-1] === "media") ?
								styles.textPrioridadeMedia : styles.textPrioridadeBaixa
						]}>{this.state.prioridade[this.state.prioridade.length-1]}</Text>
					</Text>
				</View>

				<View style={styles.viewUser}>
					<View style={{flexDirection: 'row', borderBottomWidth:2, borderColor: '#aaa'}}>
						<Ionicons name="ios-information-circle-outline" 
							size={32} 
							color="rgba(255, 255, 255, 0.7)" />

						<Text style={{fontSize: 20, 
							fontWeight: 'bold',  
							paddingBottom: 10,
							color:"rgba(255, 255, 255, 0.7)"}}>		
						{' '} Utente</Text>
					</View>
					
					
					<Text style={{paddingTop:20, fontSize: 15, fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.7)' }}>Nome Completo: {'		'}
						<Text style={{fontSize: 15, fontWeight: 'normal', color: 'rgba(255, 255, 255, 0.4)' }}>{this.state.nome}</Text>
					</Text>
					
					<Text style={{paddingTop:20, fontSize: 15, fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.7)' }}>Cartão Cidadão: {'		'}
						<Text style={{fontSize: 15, fontWeight: 'normal', color: 'rgba(255, 255, 255, 0.4)' }}>{this.state.cc}</Text>
					</Text>
						
				</View>
				
				<View style={styles.viewAdd}>
					<TouchableOpacity style={styles.addButton} onPress={this._addButton}>
						<Ionicons style={{paddingRight: 20}} 
							name="ios-add-circle-outline" 
							size={32} 
							//color="rgb(51, 102, 255)" 
							color="rgba(255, 255, 255,0.7)" />
						<Text style={styles.addButtonText}>Acompanhantes </Text>
					</TouchableOpacity>
				</View>
			</View>
			</ScrollView >
	    );
	}
}

const styles = StyleSheet.create({
	containerGeral:{
		padding:60,
		alignItems: "center"
	},
	container:{
		flex: 1,
		flexDirection: "row",
		//paddingHorizontal: 100,
		//alignItems: "center"
		//borderWidth: 2	
	},
	view:{
		backgroundColor: "#ebfaf1",
		padding: 10,
		//alignItems: "left",
		borderWidth: 3,
		borderColor: "#2BAE66FF",
		borderRadius: 30
	},
	viewPrioridadeAlta:{
		backgroundColor: "rgba(255,0,0,0.2)",
		borderWidth: 0,
		borderColor: "#ff0000",
		borderRadius: 50,
		padding: 10,
		marginTop: 30,
		width: screenWidth*0.8,
		//textAlign: "center",
	},
	textPrioridadeAlta:{
		fontWeight: 'bold', 
		color: "#ff0000",
		textDecorationLine: "underline"
	},
	viewPrioridadeMedia:{
		backgroundColor: "rgba(255,255,0,0.2)",
		borderWidth: 0,
		borderColor: "#ffff00",
		borderRadius: 50,
		padding: 10,
		marginTop: 30,
		width: screenWidth*0.8,
		//textAlign: "center",
	},
	textPrioridadeMedia:{
		fontWeight: 'bold', 
		color: "#ffff00",
		textDecorationLine: "underline"
	},
	viewPrioridadeBaixa:{
		backgroundColor: "rgba(0,255,0,0.2)",
		borderWidth: 0,
		borderColor: "#00ff00",
		borderRadius: 50,
		padding: 10,
		marginTop: 30,
		width: screenWidth*0.8,
		//textAlign: "center",
	},
	textPrioridadeBaixa:{
		fontWeight: 'bold', 
		color: "#00ff00",
		textDecorationLine: "underline"
	},
	viewAdd:{
		paddingTop: 100
		/*position: 'absolute',
		bottom: -100*/
	},
	addButton: {
		borderWidth: 0,
		borderRadius: 50,
		borderColor: 'rgba(51, 102, 255,1)',
		backgroundColor: 'rgba(255, 255, 255,0.1)',//rgba(51, 102, 255,0.2)',
		padding: 10,
		margin: 5,
		flexDirection: 'row'
	},
	addButtonText: {
		color: 'rgba(255, 255, 255,0.8)',//'rgba(51, 102, 255,1)',
		fontSize: 18,
		paddingTop: 3,
	},
	viewUser:{
		marginTop: 50,
		width: screenWidth*0.8,
		borderRadius: 20,
		padding: 15,
		paddingBottom: 50,
		backgroundColor: 'rgba(255, 255, 255,0.2)',
	}
});