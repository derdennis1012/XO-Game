import React from "react";
import Field from "../Field/Field"

import { connect } from 'react-redux';

const Game = (props) => {
    const handleClick = (i) => {
        console.log(i + " Pressed")
        props.onSetFigure(i)
        checkForWinner()
        return i;
    }

    const nextGameStep = () => {
        switch (props.gameState) {
            case 0:
                if (props.playerFigures[0] !== "" && props.playerFigures[1] !== "") {
                    props.nextStep(props.gameState + 1)
                }
                break;
            case 1:
                props.nextStep(props.gameState + 1)
                break;
            case 2:
                props.nextStep(1)
                props.resetField();
                break;
            default:
                break;
        }
    }
    const checkForWinner = () => {

        var BreakException = {};
        var winner = null;

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        try {
            winningCombinations.forEach((value) => {

                if (props.gameField[value[0]] === props.gameField[value[1]] && props.gameField[value[1]] === props.gameField[value[2]]) {
                    winner = props.gameField[value[0]];
                    console.log("[Winner] " + winner + " " + props.gameField[value[0]] + " " + value)

                    if (winner !== null) {
                        props.setWinner(winner);
                        nextGameStep();

                        throw BreakException;

                    } else {
                        console.log(props.gameField)

                    }


                }
                let n = false;
                props.gameField.forEach((value) => {
                    if (value === null) {
                        n = true;
                    }
                })

                if (!n) nextGameStep();
            })
        } catch (e) {
            console.log(e)
        }

    }
    return (<div>
        {props.gameState === 0 &&
            <div>
                <h1>Please enter your to start</h1>
                <div>
                    <label className="player-ip">Player X</label>
                    <input className="player-ip" onChange={(e) => props.onChangeInputPlayer(e.target.value, 0)} /></div>
                <div className="mt">
                    <label className="player-ip">Player O</label>
                    <input className="player-ip" onChange={(e) => props.onChangeInputPlayer(e.target.value, 1)} /></div>

                <div className="btn mt" onClick={nextGameStep}>StartGame</div></div>}
        {props.gameState === 1 &&
            <div className="field-outer">
                <span className="player-title">{props.players[0]} ({props.score[0].score}) vs. {props.players[1]} ({props.score[1].score})</span>
                <h1>{props.playerFigures[props.currentFigure]} it's your turn, {props.players[props.currentPlayer]}</h1>
                <Field fields={props.gameField} onClick={handleClick} figures={props.playerFigures} />
            </div>}
        {props.gameState === 2 &&
            <div>
                {props.winner === null && <div><h1>Nobody wons! Try again!</h1></div>}
                {props.winner !== null && <div><h1>The winner is: {props.playerFigures[props.winner]} It's you {props.players[props.winner]}</h1></div>}<div className="btn mt" onClick={nextGameStep}>Replay</div></div>}

    </div>)
}

const mapStateToProps = state => {
    return {
        gameField: state.fields,
        players: state.players,
        currentPlayer: state.currentPlayer,
        currentFigure: state.currentFigure,
        winner: state.winner,
        playerFigures: state.playerFigures,
        gameState: state.gameState,
        score: state.score
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetFigure: (index) => dispatch({ type: 'SET_FIGURE', payload: { index: index } }),
        onChangeInputPlayer: (value, index) => dispatch({ type: 'SET_PLAYER', payload: { index: index, value: value } }),
        nextStep: (value) => dispatch({ type: 'NEXT_STEP', payload: { value: value } }),
        setWinner: (value) => dispatch({ type: 'SET_WINNER', payload: { value: value } }),
        resetField: () => dispatch({ type: "RESET_FIELD" })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);