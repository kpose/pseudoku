import React from 'react';
import {Animated, Text, TouchableWithoutFeedback, View} from 'react-native';

module.exports = function () {

    //get screen dimensions
    const screenUsableWidth = this.state.screenUsableWidth;
    const screenUsableHeight = this.state.screenUsableHeight;
    const numberOfTilesAcross = this.state.numberOfTilesAcross;
    const numberOfTilesDown = this.state.numberOfTilesDown;

    //calculate tile height and width
    const tileWidth = Math.floor(screenUsableWidth / numberOfTilesAcross);
    const tileHeight = Math.floor(screenUsableHeight / numberOfTilesDown);

    //calculate space left
    const spaceTop = Math.floor((screenUsableHeight - (numberOfTilesDown * tileHeight)) / 2);
    const spaceLeft = Math.floor((screenUsableWidth - (numberOfTilesAcross * tileWidth)) / 2);

    //determine solvable random order of tiles on screen
    let tileNumbers = global.generateSolvableLayout();

    const tiles = [];
    const virtualTiles = [];
    let tileCount = 0;

    for ( let row = 0; row < numberOfTilesDown; row++) {
        const rowArray = [];
        virtualTiles.push(rowArray);
    for (let col = 0; col < numberOfTilesAcross; col++) {
        const tileNum = tileNumbers[tileCount];
        const refID = `refID_${tileCount}`;
        const left = spaceLeft + (col * tileWidth);
        const top = this.state.controlAreaHeight + spaceTop + (row * tileHeight);
    }
    }
    if (tileCount === (numberOfTilesAcross * numberOfTilesDown) - 1) {
        rowArray.push({ refID: refID, tileNum: 0});

        tiles.push(
            <View key = {tileCount}
                ref = { (inRef) => {
                    const refs = this.state.refs;
                    refs[refID] =inRef;
                    this.setState({ refs : refs});
                }}
                />
        );
    }
}