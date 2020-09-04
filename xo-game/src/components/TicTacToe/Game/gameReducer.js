const initialState = {
    players: ["Dennis", "Samuel"],
    currentPlayer: 0,
    currentFigure: 0,
    payerFigures: ["X", "O"],
    fields: ["X", "O", "X", "X", "O", "X", "O", "O", "O"],
    winner: 0
}
const reducer = (state = initialState, action) => {
    return state
}

export default reducer;