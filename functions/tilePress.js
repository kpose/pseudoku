import { Animated } from "react-native";

module.exports = function(inRefID) {
    if (this.state.controlMenuVisible) {
        return;
    }

    const tile = this.state.refs[inRefID];
    const virtualTiles = this.state.virtualTiles;
    let virtualTile = null;
    let tileLoc = null;
    const numberOfTilesAcross = this.state.numberOfTilesAcross;
    const numberOfTilesDown = this.state.numberOfTilesDown;

    for (let row = 0; row < numberOfTilesDown; row++) {
        const rowArray = virtualTiles[row];
        for (let col = 0; col < numberOfTilesAcross; col++) {
            const vt = rowArray[col];
            if (vt.refID === inRefID) {
                virtualTile = vt;
                tileLoc = { row: row, col: col };
                break;
            }
        }
    }
}