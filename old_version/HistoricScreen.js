import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, Label, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressCircle  } from 'react-native-svg-charts'

import { db } from '../config.js'; //acesso a base de dados 

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class HistoricScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = { historico: '' }
	}

	async componentDidMount(){
		// Create a reference
		const ref = db.ref(`/utentes/${this.props.route.params?.userData.idPulseira}`);
		
		var that = this;
        let arr_historico = "";
		
		ref.on('value', function (snapshot) {
            arr_historico = snapshot.val().historico;
			
			that.setState({ historico: arr_historico });
		});

	}
    render(){ 
        return (
			<View  style={styles.containerGeral}>
				<View style={styles.viewHistoric}>
                    <View style={{flexDirection: 'row', borderBottomWidth:2, borderColor: '#aaa'}}>
						<Ionicons name="ios-hourglass" 
							size={32} 
							color="rgba(255, 255, 255, 0.7)" />
						<Text style={{fontSize: 20, 
							fontWeight: 'bold',  
							paddingBottom: 10,
							color:"rgba(255, 255, 255, 0.7)"}}>		
						{' '} Histórico</Text>
					</View>

					<ScrollView style={styles.scrollView}>
						{ Object.values(this.state.historico).map((value, index) => { return(
							
                            <View key={index} style={[(value['prioridade'] === "alta") ?
                                    styles.viewPrioridadeAlta : (value['prioridade'] === "media") ?
                                    styles.viewPrioridadeMedia : styles.viewPrioridadeBaixa ]}>
                            <View style={{flexDirection: 'row'}}>
                                
                                <View style={{marginTop:8, backgroundColor: "rgba(255, 255, 255, 0.3)",borderColor: "rgba(100, 100, 100, 1)", borderWidth:0, padding: 15, marginBottom: 10, borderRadius: 10}}>
                                    <Text style={{fontSize: 44, color: '#000'}}>{value['sala']}</Text>
                                    <Text style={{fontSize: 12, color: '#000', position:'absolute', alignSelf: 'center'}}>Sala</Text>
                                </View>

                                <View style={{flex:1, alignItems:'center', paddingVertical: 10}}>
						        </View>
								
                               	<ProgressCircle style={{ width: screenWidth*0.3, height: 100}} backgroundColor={'rgba(255, 255, 255, 0.05)'} startAngle={21.7} cornerRadius={45} strokeWidth={5} progress={0.9} progressColor={'rgba(255, 255, 255, 0.7)' }>
									<View>
										<Text style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 25, fontWeight: 'bold', textAlign: 'center', paddingTop:30 }}> {value['tempo_dem']}</Text>
										<Ionicons style={{textAlign: 'center', paddingTop:5}} name="ios-clock" size={27} color="rgba(255, 255, 255, 0.6)" />
									</View>
								</ProgressCircle>
                            </View>
                            <Text style={{textAlign: 'center', fontWeight: 'normal', fontSize: 20, color: '#fff'}}> 
                                    Prioridade: {'		'}
                                    <Text style={[(value['prioridade'] === "alta") ?
                                            styles.textPrioridadeAlta : (value['prioridade'] === "media") ?
                                            styles.textPrioridadeMedia : styles.textPrioridadeBaixa
                                    ]}>{value['prioridade']}</Text>
                            </Text>
                        </View>
                            
                            
                            /* <View key={index} style={{alignItems:'flex-start', marginBottom:10, flexDirection: 'row', borderBottomWidth:2, borderColor: '#000'}}>
								<Ionicons style={{paddingLeft: 5, paddingBottom: 10,}} name="ios-person" 
									size={32} 
									color="rgba(100, 100, 100, 1)" >
										<Text style={{fontSize: 18, color: 'rgba(255, 255, 255, 0.2)'}}>{index+1}</Text>
										<Text style={{fontSize: 24, color: 'rgba(255, 255, 255, 0.3)'}}>{'			'}{value['sala']}</Text>
								</Ionicons>
							</View> */
						)})}
					</ScrollView>			
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
	viewHistoric:{
		width: screenWidth*0.8,
		//height:screenHeight*0.6,
		maxHeight: screenHeight*0.8,
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
    viewPrioridadeAlta:{
		backgroundColor: "rgba(255,0,0,0.2)",
		borderWidth: 0,
		borderColor: "#ff0000",
		borderRadius: 20,
		padding: 10,
		marginTop: 30,
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
		borderRadius: 20,
		padding: 10,
		marginTop: 30,
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
		borderRadius: 20,
		padding: 10,
		marginTop: 30,
        //textAlign: "center"
	},
	textPrioridadeBaixa:{
		fontWeight: 'bold', 
		color: "#00ff00",
		textDecorationLine: "underline"
	},
});