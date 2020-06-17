import React, { Component } from 'react'
import { Text, View, Button, Platform, Image, Slider, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import state from './state';



global.buildMatrix = require('./functions/buildMatrix');
global.generateSolvableLayout = require('./functions/generateSolvableLayout');
/* global.tilePress = require('./functions/tilePress'); 
global.determineOutcome = require('./functions/determineOutcome');
global.alterMatrixSize = require('./functions/alterMatrixSize'); */



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = state;

    
    global.generateSolvableLayout = global.generateSolvableLayout.bind(this);
    global.buildMatrix = global.buildMatrix.bind(this);
    /* global.determineOutcome = global.determineOutcome.bind(this);
    global.alterMatrixSize = global.alterMatrixSize.bind(this);
    global.tilePress = global.tilePress.bind(this);   */
  }
  render() {

    //control menu screen
    let controlMenu = null;
    
    if (this.state.controlMenuVisible) {
      controlMenu = (
        <View  style = {{ 
              padding : 20, 
              position: "absolute",
              zIndex: 9999,
              flex: 1, 
              alignItems: "stretch", 
              justifyContent: "center",
              borderRadius: 20, 
              backgroundColor: "rgba(100, 64,255, 0.95)",
              width: this.state.controlMenuWidth, 
              height: this.state.controlMenuHeight,
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

                <View style = {{ paddingTop : 40}}>
                  <Text style = {{color: "#ffffff"}}>
                    Warning: Changing the grid size will automatically begin a new game!
                  </Text>
                </View>

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

    //you won screen
    let wonScreen = null;
    if (this.state.wonVisible) {
      const elapsedTime = Math.round(
        (new Date().getTime() - this.state.startTime) / 1000
      );
      wonScreen = (
        <View style={{
          zIndex : 9998,
          position : "absolute",
          left : 0,
          top : this.state.controlAreaHeight,
          width : this.state.screenUsableWidth,
          height : this.state.screenUsableHeight
        }}>
          <Image source={require("./assets/splash.png")}
            resizeMode="stretch" fadeDuration={0}
            style={{
              width : this.state.screenUsableWidth,
              height : this.state.screenUsableHeight
            }}
          />
          <View style={{
            alignItems : "center",
            justifyContent : "center",
            position : "absolute",
            width : "100%",
            left : 0,
            zIndex : 9999,
            top : this.state.screenUsableHeight - 240
          }}>
            <Text style={{ fontSize : 20, fontWeight : "bold" }}>
              You took {this.state.moveCount} moves to win
            </Text>
            <Text style={{
              fontSize : 20, fontWeight : "bold", paddingBottom : 40
            }}>
              Game lasted {elapsedTime} seconds
            </Text>
            <Button title="Start A New Game"
              onPress={ () => {
                state.numberOfTilesAcross = this.state.numberOfTilesAcross;
                state.numberOfTilesDown = this.state.numberOfTilesDown;
                this.setState(state, buildMatrix);
              }}
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
          {wonScreen}
          {controlMenu}
          {this.state.tiles}
        </SafeAreaView>
      </View> 
    )
  }

  componentDidMount() {
    this.setState(state, buildMatrix);
  }

}
