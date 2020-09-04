import React from "react";
import Field from "../Field/Field"

import { connect } from 'react-redux';

const Game = (props) => {
    const handleClick = (i) => {
        return i;
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
                    console.log("[Winner] " + winner)
                    if (winner !== null) throw BreakException;

                }
            })
        } catch (e) {
            console.log(e)
        }

    }
    checkForWinner()
    return (<div className="field-outer">
        <span className="player-title">{props.players[0]} vs. {props.players[1]}</span>
        <h1>{props.currentFigure} it's your turn, {props.players[props.currentPlayer]}</h1>
        <Field fields={props.gameField} onClick={handleClick} />
    </div>)
}

const mapStateToProps = state => {
    return {
        gameField: state.fields,
        players: state.players,
        currentPlayer: state.currentPlayer,
        currentFigure: state.currentFigure,
        winner: state.winner
    };
}

export default connect(mapStateToProps)(Game);