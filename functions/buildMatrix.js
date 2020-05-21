import React from 'react';
import {Animated, Text, TouchableWithoutFeedback, View} from 'react-native';

module.exports = function () {

    //get screen dimensions
    const screenUsableWidth = this.state.screenUsableWidth;
    const screenUsableHeight = this.state.screenUsableHeight;
    const numberOfTilesAcross = this.state.numberOfTilesAcross;
    const numberOfTilesDown = this.state.numberOfTilesDown;

    //calculate tile height and width of each tile
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
        
        //calculate physical position of tiles
        const left = spaceLeft + (col * tileWidth);
        const top = this.state.controlAreaHeight + spaceTop + (row * tileHeight);

        if (tileCount === (numberOfTilesAcross * numberOfTilesDown) - 1) {
            rowArray.push({ refID: refID, tileNum: 0});
    
            //add empty tile
            tiles.push(
                <View key = {tileCount}
                    ref = { (inRef) => {
                        const refs = this.state.refs;
                        refs[refID] =inRef;
                        this.setState({ refs : refs});
                    }}
                    />
            );
        } else {
            rowArray.push({ refID: refID,  tileNum: tileNum});
    
            tiles.push(
                <Animated.View key={tileCount}
                    ref={ (inRef) => {
                        const refs = this.state.refs;
                        refs[refID] = inRef;
                        this.setState({ refs: refs });
                    }}
                    style = {[
                        {
                            position : "absolute",
                            backgroundColor: "#d08080",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 10,
                            borderTopColor: "#80a080",
                            borderLeftColor: "#80a080",
                            borderBottomColor: "#c0f0c0",
                            borderRightColor: "#c0f0c0",
                            borderStyle: "solid",
                            borderRadius: 20
                        },
                        {
                            left: new Animated.Value(left),
                            top: new Animated.Value(top),
                            width: tileWidth - 4, 
                            height : tileHeight - 4
                        }
                    ]} >
                        <TouchableWithoutFeedback onPress = { () => global.tilePress(refID) }>
                            <View style = {{ width: tileWidth, 
                                             height: tileHeight,
                                             alignItems: "center",
                                             justifyContent: "center"
                                    }}>
                                        <Text style = {{
                                            fontWeight: "bold",
                                            fontSize: 24
                                        }}> {tileNum} </Text>
                                    </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
            );
    }
     tileCount = tileCount + 1;
    }
}
this.setState({
    tiles: tiles, virtualTiles : virtualTiles,
    tileWidth: tileWidth, tileHeight: tileHeight
});
  
}
