import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, Label, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../config.js'; //acesso a base de dados 

import { StackedBarChart, ProgressCircle  } from 'react-native-svg-charts'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class PrevisoesScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = { proxima: '', acompanhantes: '' }
	}

	_addButton(){
		Alert.alert('INFORMAÇÃO','Em desenvolvimento...\nDesculpa!')
	}

	async componentDidMount(){
		// Create a reference
		const ref = db.ref(`/utentes/${this.props.route.params?.userData.idPulseira}`);
		
		var that = this;
		let d_proximasala = "";
		let arr_acompanhantes = "";
		
		ref.on('value', function (snapshot) {
			d_proximasala = snapshot.val().proxima_sala;
			arr_acompanhantes = snapshot.val().acompanhantes;
			
			that.setState({ proxima: d_proximasala, acompanhantes: arr_acompanhantes });
		});
	}
    render(){ 
        return (
			<View  style={styles.containerGeral}>
				<View style={styles.viewNext}>
					<View style={{flexDirection: 'row', borderBottomWidth:2, borderColor: '#aaa'}}>
						<Ionicons name="ios-information-circle-outline" 
							size={32} 
							color="rgba(255, 255, 255, 0.7)" />

						<Text style={{fontSize: 20, 
							fontWeight: 'bold',  
							paddingBottom: 10,
							color:"rgba(255, 255, 255, 0.7)"}}>		
						{' '} Próxima Sala</Text>
					</View>

					

					<View style={{alignItems:'flex-start', marginBottom:10, paddingTop:20, flexDirection: 'row', borderBottomWidth:0, borderColor: '#000'}}>
						
						<View style={{marginTop:8, backgroundColor: "rgb(44, 174, 102)",borderColor: "rgba(100, 100, 100, 1)", borderWidth:0, padding: 15, marginBottom: 10, borderRadius: 10}}>
							<Text style={{fontSize: 44, color: '#0a2918'}}>{this.state.proxima[0]}</Text>
							<Text style={{fontSize: 12, color: '#0a2918', position:'absolute', alignSelf: 'center'}}>Sala</Text>
						</View>
						
						<View style={{flex:1, alignItems:'center', paddingVertical: 10}}>
						</View>

						<ProgressCircle style={{ width: screenWidth*0.3, height: 100}} backgroundColor={'#0a2918'} cornerRadius={45} strokeWidth={5} progress={0.4} progressColor={'rgb(44, 174, 102)' }>
							<View>
							<Text style={{ color: "rgb(44, 174, 102)", fontSize: 15, fontWeight: 'bold', textAlign: 'center', paddingTop:20 }}> 00:12h</Text>
							<Text style={{ color: "rgb(44, 174, 102)", fontSize: 6, fontWeight: 'bold', textAlign: 'center'}}> ___________________________</Text>
							<Text style={{ color: "rgb(44, 174, 102)", fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}> 00:30h</Text>
							<Ionicons style={{textAlign: 'center', paddingTop:5}} name="ios-clock" size={16} color="rgb(44, 174, 102)" />
							</View>
						</ProgressCircle>
								
					</View>
						
				</View>
				
				<View style={styles.viewSalas}>
					<View style={{flexDirection: 'row', borderBottomWidth:2, borderColor: '#aaa'}}>
						<Ionicons name="ios-list" 
							size={32} 
							color="rgba(255, 255, 255, 0.7)" />
						<Text style={{fontSize: 20, 
							fontWeight: 'bold',  
							paddingBottom: 10,
							color:"rgba(255, 255, 255, 0.7)"}}>		
						{' '} Salas Seguintes</Text>
					</View>
					
					<ScrollView style={styles.scrollView}>
						{ Object.values(this.state.acompanhantes).map((value, index) => { return(
							<View key={index} style={{alignItems:'flex-start', marginBottom:10, flexDirection: 'row', borderBottomWidth:2, borderColor: '#000'}}>
								<View style={{backgroundColor: "rgba(100, 100, 100, 1)",borderColor: "rgba(100, 100, 100, 1)", borderWidth:0, padding: 10, marginBottom: 10, borderRadius: 10}}>
									<Text style={{fontSize: 37, color: 'rgba(255, 255, 255, 0.3)'}}>03</Text>
									<Text style={{fontSize: 10, color: 'rgba(255, 255, 255, 0.3)', position:'absolute', alignSelf: 'center',}}>Sala</Text>
								</View>
								<View style={{flex:1, alignItems:'center', paddingVertical: 10}}>
									<Ionicons name="ios-stopwatch" 
										size={37} 
										color="rgba(255, 255, 255, 0.7)" />
								</View>
								<View style={{backgroundColor: "rgba(100, 100, 100, 1)",borderColor: "rgba(100, 100, 100, 1)", borderWidth:0, padding: 10, marginBottom: 10, marginRight: 10,borderRadius: 10}}>
									<Text style={{fontSize: 37, color: 'rgba(255, 255, 255, 0.3)'}}>00:30m</Text>
									<Text style={{fontSize: 10, color: 'rgba(255, 255, 255, 0.3)', position:'absolute', alignSelf: 'center',}}>Previsão de espera</Text>
								</View>
								
							</View>
						)})}
					</ScrollView>			
				</View>

				<View style={styles.viewAdd}>
					<TouchableOpacity style={styles.addButton} onPress={this._addButton}>
						<Ionicons style={{paddingRight: 20, paddingLeft:10}} 
							name="ios-person-add" 
							size={32} 
							//color="rgb(51, 102, 255)" 
							color="rgba(255, 255, 255,0.5)" />
						<Text style={styles.addButtonText}>Acompanhantes </Text>
					</TouchableOpacity>
				</View>

			</View>
	    );
	}
}

const styles = StyleSheet.create({
	containerGeral:{
		padding:80,
		alignItems: "center"
	},
	viewNext:{
		marginBottom: 50,
		width: screenWidth*0.8,
		borderRadius: 20,
		padding: 15,
		paddingBottom: 50,
		backgroundColor: 'rgba(255, 255, 255,0.2)',
	},
	viewSalas:{
		width: screenWidth*0.8,
		//height:screenHeight*0.6,
		maxHeight: screenHeight*0.46,
		borderRadius: 20,
		padding: 30,
		paddingBottom: 50,
		backgroundColor: 'rgba(255, 255, 255,0.2)',
	},
	scrollView:{
		marginTop: 30,
		
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
});