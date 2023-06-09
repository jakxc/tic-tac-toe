import "./App.css";
import classNames from "classnames";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import Scoreboard from "./components/Scoreboard";
import Footer from "./components/Footer";
import { deriveStats, deriveGame } from "./utils";
import { GameState, Player } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";

const initialState: GameState = {
    currentGameMoves: [],
    history: {
      currentRoundGames: [],
      allGames: [],
    },
};


const App = () => {
    const [state, setState] = useLocalStorage("game-state-key", initialState);

    const game = deriveGame(state);
    const stats = deriveStats(state);

    const resetGame = (resetAll: boolean) => {
        setState((prevState) => {
          const stateClone = structuredClone(prevState);
          
          // If game is complete, archive it to history object
          if (game.status.isComplete) {
            const { moves, status } = game;
            stateClone.history.currentRoundGames.push({
              moves,
              status,
            });
          }
    
          stateClone.currentGameMoves = [];
    
          // Must archive current round in addition to resetting current game
          if (resetAll) {
            stateClone.history.allGames.push(...stateClone.history.currentRoundGames);
            stateClone.history.currentRoundGames = [];
          }
    
          return stateClone;
        });
      };

    const handlePlayerMove = (squareId: number, player: Player) => {
        setState((prev) => {
          const { currentGameMoves } = structuredClone(prev);
    
          currentGameMoves.push({
            player,
            squareId,
          });
    
          return {
            ...prev,
            currentGameMoves,
          };
        });
    };

    const gridElements = Array
                        .from({length: 9}, (_, i) => i + 1)
                        .map(squareId => { 
                            const existingMove = game.moves.find((move) => {
                                return move.squareId === squareId;
                            })

                            return (
                                <div 
                                    key={squareId} 
                                    className="square shadow"
                                    onClick={() => {
                                            if (existingMove) return;
                                            handlePlayerMove(squareId, game.currentPlayer);
                                        }
                                    }
                                >
                                    {existingMove 
                                        &&  <i
                                        className={classNames(
                                          "fa-solid",
                                          existingMove.player.iconClass,
                                          existingMove.player.colorClass
                                        )}
                                      ></i>}
                                </div> 
                            )
                        })
    return (
        <>
            <main>
                <div className="grid-container">
                <div key={game.currentPlayer.id} className={classNames("turn", game.currentPlayer.colorClass)}>
                    <i
                    className={classNames("fa-solid", game.currentPlayer.iconClass)}
                    ></i>
                    <p>{game.currentPlayer.name}, your turn!</p>
                </div>
                    <Menu  
                        onAction={(action) => {
                            resetGame(action === "reset-all");
            }        }/>
                    {gridElements}
                    <Scoreboard 
                        playerOneWins = {stats.playersStats[0].wins}
                        playerTwoWins = {stats.playersStats[1].wins}
                        ties = {stats.ties}
                    />
                </div>
            </main>
            <Footer />
            {game.status.isComplete && (
                <Modal
                    message={
                        game.status.winner ? `${game.status.winner.name} wins!` : "Tie!"
                    }
                    onClick={() => resetGame(false)}
                />
            )}
        </>
    )
}

export default App;