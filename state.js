import { Dimensions } from "react-native";

const controlAreaHeight = 50;

const {height, width } = Dimensions.get("window");


module.exports = {
    tiles : [],
    numberOfTilesAcross: 3,
    numberOfTilesDown : 3,
    screenUsableWidth: width,
    screenUsableHeight: (height - controlAreaHeight) - 80,
    refs: {},
    virtualTiles : null,
    tileWidth: null,
    tileHeight: null,
    controlAreaHeight: controlAreaHeight,
    controlMenuVisible: false,
    controlMenuWidth: 380,
    controlMenuHeight: 480,
    controlMenuButtonDisabled: false,
    wonVisible: false,
    moveCount: 0,
    startTime: new Date().getTime() 
};