import React, { Component } from 'react'
import { Text, View, Button, Platform, Image, Slider, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import state from './state';

export default class App extends Component {
  render() {
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
          <Button title = "CONTROL MENU" 
                  />
          {/* {wonScreen}
          {controlMenu} */}
          {/* {this.state.tiles} */}
        </SafeAreaView>
      </View>
    )
  }
}
