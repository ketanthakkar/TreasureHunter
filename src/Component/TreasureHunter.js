import React, {useState, useEffect} from 'react';
import { sendPlayerName, getResult } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import '../index.css';

//Global variable declartion
let marked = [];
let steps = 0;
let score = 11;
let winner = false;
let games = [];
const player = {
    steps: 0,
    squares: Array(25).fill(null),
}


//This function will create clickable square
const Square = ({ value, onClick }) => {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
}

//This function will reset button
const Reset = ({ onClick }) => {
    return (
      <button className="button restart-button" onClick={onClick}>
        Reset
      </button>
    );
}

function checkWinner(squares, name) {
    if(squares.filter(val => val === "T").length === 3) {
        score -= steps;

        if(localStorage.getItem("game")) {
           let arr = JSON.parse(localStorage.getItem("game"));
           games = arr.slice();
        }

        let user = {};
        user.playerName = name;
        user.score = score;
        games.push(user);
        games.splice(10);

        localStorage.removeItem(name);
        localStorage.setItem("game", JSON.stringify(games))
        return true;
    }
    return false;
}

const showWinnerList = () => {
    if(localStorage.getItem("game")) {
        let playerData = JSON.parse(localStorage.getItem("game"));
        games = playerData.slice();
        games.sort((a,b) => (a.score < b.score) ? 1 : -1);
    }
}


//Game function component
const TreasureHunter = () => {
    const [name, setName] = useState();
    const [ squares, setSquares ] = useState(Array(25).fill(null));
    const [ isNewGame, setIsNewGame ] = useState(true);
    const selection = "x";
    winner = checkWinner(squares, name);
    showWinnerList();

    let message = useSelector(state => state.newboard.message);
    let result = useSelector(state => state.treasureData.treasure);
    
    const dispatch = useDispatch();
    
    //Submit user name to backend and get game data. if user already exist then get data from localstorage
    const submitName = () => {
        if(localStorage.getItem(name)) {
            let getUserGame = JSON.parse(localStorage.getItem(name)).squares;
            let getSteps = JSON.parse(localStorage.getItem(name)).steps;

            getUserGame && setSquares(getUserGame);
            steps = Number(getSteps);
        }
        dispatch(sendPlayerName(name));
    }
    
    const checkResult = () => {
        steps += 1;
        dispatch(getResult(marked));
    }
    
    //render square for game
    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => {
                if(squares[i] != null || winner || marked.length === 3) {
                    return;
                }
                const allSquares = squares.slice();
                allSquares[i] = selection;
                !marked.includes(i) && marked.push(i);
                setSquares(allSquares);
            }}
            />
        );
    }

    //Set results for selected position
    const setResult = () => {
        const allSquares = squares.slice();
        
        marked.map((pos, index) => {
            allSquares[pos] = result[index];
        })
        marked = [];
        setSquares(allSquares);
        player.steps = steps;
        player.squares = allSquares;
        localStorage.setItem(name, JSON.stringify(player));
    }

    const ActionButtons = () => {
        return (
            <div className="action-buttons">
                { marked.length === 3 && <button className="button check-result-button" onClick={() => checkResult()}>
                    Check
                </button>
                }
                <Reset
                    onClick={() => {
                    setSquares(Array(25).fill(null));
                    marked = [];
                    steps = 0;
                    score = 11;
                    }}
                />
            </div>
        )
    }

    useEffect(() => {
        message && setIsNewGame(false);
        
        if(result && result.length) { 
            setResult();
        }
    }, [message, result]);

    return (
    <>
        <div className="teasure-board">
          <div className="game">
           { isNewGame ?
            (
            <div className="enter-name">
              <input type="text" className="username" placeholder="Enter Your Name" onChange={event => setName(event.target.value.toLowerCase())} />
            </div>
            ) : (
            <div className="user-display">    
                <div className="game-board">
                    <div className="board-row">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                        {renderSquare(3)}
                        {renderSquare(4)}
                    </div>
                    <div className="board-row">
                        {renderSquare(5)}
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                        {renderSquare(9)}
                    </div>
                    <div className="board-row">
                        {renderSquare(10)}
                        {renderSquare(11)}
                        {renderSquare(12)}
                        {renderSquare(13)}
                        {renderSquare(14)}
                    </div>
                    <div className="board-row">
                        {renderSquare(15)}
                        {renderSquare(16)}
                        {renderSquare(17)}
                        {renderSquare(18)}
                        {renderSquare(19)}
                    </div>
                    <div className="board-row">
                        {renderSquare(20)}
                        {renderSquare(21)}
                        {renderSquare(22)}
                        {renderSquare(23)}
                        {renderSquare(24)}
                    </div>
                </div>
                <div className="winner-list">
                    <header>Winner List</header>
                   { games.map((player, index) => (
                       <div className="player-detail" key={index}>
                           <div className="player-name">{player.playerName}</div>
                           <div className="player-score">{player.score}</div>
                       </div>   
                   ))}
                </div>
            </div>
            )}
            <div className="game-display">{winner && `Congratulation!! Score: ${score}`}</div>
            <div className="button-container">
            { isNewGame ?
                (
                <button className="button submit-button" onClick={() => submitName()}>
                    Start
                </button>
                ):(
                 <ActionButtons />
                 )}                
            </div>
          </div>
        </div>
    </>
    )
};


export default TreasureHunter;