const initialState = {
    players: [],
    currentPlayer: 0,
    currentFigure: 0,
    playerFigures: ['X', 'O'],
    fields: [null, null, null, null, null, null, null, null, null],
    winner: null,
    gameState: 0,
    score: {}
}
const reducer = (state = initialState, action) => {
    var tmp = Object.assign({}, state)
    switch (action.type) {
        case "SET_FIGURE":

            if (tmp.fields[action.payload.index] !== null) return tmp;
            console.log(action.payload.index)
            console.log("Figure ID is " + tmp.currentFigure + " So it is Figure: " + tmp.playerFigures[tmp.currentFigure] + " At the Position " + action.payload.index + " Its now: " + tmp.fields[action.payload.index])
            tmp.fields[action.payload.index] = tmp.currentFigure;
            if (tmp.currentFigure === 1) tmp.currentFigure = 0;
            else tmp.currentFigure = 1;
            if (tmp.currentPlayer === 1) tmp.currentPlayer = 0;
            else tmp.currentPlayer = 1;
            console.log(tmp)
            return tmp

        case "SET_PLAYER":
            console.log(action)
            tmp.players[action.payload.index] = action.payload.value;
            tmp.score[action.payload.index] = { score: 0 }
            return tmp;
        case "NEXT_STEP":
            return {
                ...state,
                gameState: action.payload.value
            }
        case "RESET_FIELD":
            console.log(state.score)
            return {
                ...state,
                winner: null,
                fields: [null, null, null, null, null, null, null, null, null]
            }
        case "SET_WINNER":
            tmp.score[action.payload.value].score = tmp.score[action.payload.value].score + 1
            tmp.winner = action.payload.value;
            return tmp
    }

    return state
}

export default reducer;