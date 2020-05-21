import React, { Component } from 'react'
import { Text, View, Button, Platform, Image, Slider, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import state from './state';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = state;

    /* global.alterMatrixSize = global.alterMatrixSize.bind(this);
    global.buildMatrix = global.buildMatrix.bind(this);
    global.determineOutcome = global.determineOutcome.bind(this);
    global.generateSolvableLayout = global.generateSolvableLayout.bind(this);
    global.tilePress = global.tilePress.bind(this);  */
  }
  render() {

    let controlMenu = null;
    
    if (this.state.controlMenuVisible) {
      controlMenu = (
        <View  style = {{ 
              padding : 20, position: "absolute", zIndex: 9999,
              flex: 1, alignItems: "stretch", justifyContent: "center",
              borderRadius: 20, backgroundColor: "rgba(100, 64,255,0.95)",
              width: this.state.controlMenuWidth, height: this.state.controlMenuHeight,
              left : (this.state.screenUsableWidth - this.state.controlMenuWidth) / 2,
              top : (this.state.screenUsableHeight - this.state.controlMenuHeight) / 2 }}>

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
                       value= {3} step = {1} maximumTrackTintColor= "#C240A6" 
                       onSlidingComplete = { (value) => global.alterMatrixSize("across", value) }
                        />
                <Text style = {{ color: "#ffffff", paddingTop: 40}}>Tiles Down</Text>
                <Slider minimumValue = {3} maximumValue = {6} 
                       value= {3} step = {1} maximumTrackTintColor= "#C240A6" 
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
      <View style = {{
        flex : 1,
        alignItems: "stretch",
        backgroundColor: "#000000"
      }}>
        <SafeAreaView style = {{
          position: "absolute",
          left: 0,
          width: "100%",
          top : Platform.OS.toLowerCase() === "android" ?
                Constants.statusBarHeight + 10 : Constants.statusBarHeight
        }}>
          <Button title = "Control Menu"
                  disabled = {this.state.controlMenuButtonDisabled}
                  onPress={ () => {this.setState({
                    controlMenuButtonDisabled : true, controlMenuVisible : true
                  }) }}
                  />
          {/* {wonScreen} */}
          {controlMenu}
          {/* {this.state.tiles} */}
        </SafeAreaView>
      </View>
    )
  }
}
