import { GameState, Player } from "./types";

// Our players "config" - defines icons, colors, name, etc.
const players: Player[] = [
    {
      id: 1,
      name: "Player 1",
      iconClass: "fa-x",
      colorClass: "player-one",
    },
    {
      id: 2,
      name: "Player 2",
      iconClass: "fa-o",
      colorClass: "player-two",
    },
  ];

const deriveGame = (state: GameState) => {
    const currentPlayer = players[state.currentGameMoves.length % 2];
  
    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];
  
    let winner = null;
  
    for (const player of players) {
      const selectedSquareIds = state.currentGameMoves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.squareId);
  
      for (const pattern of winningPatterns) {
        if (pattern.every((el) => selectedSquareIds.includes(el))) {
          winner = player;
        }
      }
    }
  
    return {
      moves: state.currentGameMoves,
      currentPlayer,
      status: {
        isComplete: winner != null || state.currentGameMoves.length === 9,
        winner,
      },
    };

}

const deriveStats = (state: GameState) => {
    return {
        playersStats: players.map((player: Player) => {
          const wins = state.history.currentRoundGames.filter(
            (game) => game.status.winner?.id === player.id
          ).length;
  
          return {
            ...player,
            wins,
          };
        }),
        ties: state.history.currentRoundGames.filter(
          (game) => game.status.winner === null
        ).length,
      };
}

export { deriveGame, deriveStats }

