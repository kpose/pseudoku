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
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

