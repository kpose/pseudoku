import React from 'react';
import { Text, View, Button, Platform, Image, Slider } from 'react-native';
import { constants } from 'expo';
import state from './state';


global.alterMatrixSize = require('./functions/alterMatrixSize');
global.buildMatrix = require('./functions/buildMatrix');
global.determineOutcome = require('./functions/determineOutcome');
global.generateSolvableLayout = require('./functions/generateSolvableLayout');
global.tilePress = require('./functions/tilePress');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = state;

    global.alterMatrixSize = global.alterMatrixSize.bind(this);
    global.buildMatrix = global.buildMatrix.bind(this);
    global.determineOutcome = global.determineOutcome.bind(this);
    global.generateSolvableLayout = global.generateSolvableLayout.bind(this);
    global.tilePress = global.tilePress.bind(this); 
  }
  render() {

    let controlMenu = null;
    
    if (this.state.controlMenuVisible) {
      controlMenu = (
        <View style = {{ 
              padding : 20, position: "absolute", zIndex: 9999,
              flex: 1, alignItems: "stretch", justifyContent: "center",
              borderRadius: 20, backgroundColor: "rgba(100, 64,255,0.95)",
              width: this.state.controlMenuWidth, height: this.state.controlMenuHeight,
              left: (this.state.screenUsableHeight - this.state.controlMenuHeight) / 2 }}>

               <View style = {{ alignSelf: "center", paddingBottom: 40}}>
                  <Text style = {{color:"#ffffff", fontSize: 24, fontWeight: "bold"}}>
                    Control Menu
                  </Text>
               </View> 

               <View style= {{ paddingBottom: 40, alignSelf: "center"}}>
                 <Button title = "Start A New Game" style = {{ width: 150 }}
                          onPress= {() => {
                            state.numberOfTilesAcross = this.state.numberOfTilesAcross;
                            state.numberOfTilesDown = this.state.numberOfTilesDown;
                            this.setState(state, buildMatrix);
                          }}
                          />
               </View>

               <Text style = {{ color : "#ffffff" }}>Tiles Across</Text>
               <Slider minimumValue = {3} maximumValue = {6} 
                       value= {3} step = {1} maximumTrackTintColor= "white" 
                       onSlidingComplete = { (value) => global.alterMatrixSize("across", value) }
                        />
                <Text style = {{ color: "#ffffff", paddingTop: 40}}>Tiles Down</Text>
                <Slider minimumValue = {3} maximumValue = {6} 
                       value= {3} step = {1} maximumTrackTintColor= "white" 
                       onSlidingComplete = { (value) => global.alterMatrixSize("down", value) }
                        />

                <View style = {{ paddingTop : 40}}><Text style = {{color: "#ffffff"}}>
                  Warning: Changing the grid size will automatically begin a new game!
                </Text></View>

                <View style = {{ paddingTop: 40, alignSelf: "center" }}>
                  <Button title= "Done" style = {{ width: 150 }}
                          onPress= { () => this.setState({
                            controlMenuVisible: false, controlMenuButtonDisabled : false 
                          }) }
                          />
                </View>
              </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

