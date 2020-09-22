import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, Label, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../config.js'; //acesso a base de dados 

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class AcompanhantesScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = { acompanhantes: '' }
	}

	_addButton(){
		Alert.alert('INFORMAÇÃO','Em desenvolvimento...\nDesculpe!')
	}

	async componentDidMount(){
		// Create a reference
		const ref = db.ref(`/utentes/${this.props.route.params?.userData.idPulseira}`);
		
		var that = this;
		let arr_acompanhantes = "";
		
		ref.on('value', function (snapshot) {
			arr_acompanhantes = snapshot.val().acompanhantes;
			
			that.setState({ acompanhantes: arr_acompanhantes });
		});

	}
    render(){ 
        return (
			<View  style={styles.containerGeral}>
				<View style={styles.viewUser}>
					<View style={{flexDirection: 'row', borderBottomWidth:2, borderColor: '#aaa'}}>
						<Ionicons name="ios-people" 
							size={32} 
							color="rgba(255, 255, 255, 0.7)" />
						<Text style={{fontSize: 20, 
							fontWeight: 'bold',  
							paddingBottom: 10,
							color:"rgba(255, 255, 255, 0.7)"}}>		
						{' '} Acompanhantes</Text>
					</View>
					
					<ScrollView style={styles.scrollView}>
						{ Object.values(this.state.acompanhantes).map((value, index) => { return(
							<View key={index} style={{alignItems:'flex-start', marginBottom:10, flexDirection: 'row', borderBottomWidth:2, borderColor: '#000'}}>
								<Ionicons style={{paddingLeft: 5, paddingBottom: 10,}} name="ios-person" 
									size={32} 
									color="rgba(100, 100, 100, 1)" >
										<Text style={{fontSize: 18, color: 'rgba(255, 255, 255, 0.2)'}}>{index+1}</Text>
										<Text style={{fontSize: 24, color: 'rgba(255, 255, 255, 0.3)'}}>{'			'}{value}</Text>
								</Ionicons>
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
	viewUser:{
		width: screenWidth*0.8,
		//height:screenHeight*0.6,
		maxHeight: screenHeight*0.55,
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