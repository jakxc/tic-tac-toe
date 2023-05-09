type Player = {
    id: number;
    name: string;
    iconClass: string;
    colorClass: string;
};
  
type Move = {
    player: Player;
    squareId: number; // from 1-9, represents square on game board
};
  
type GameStatus = {
    isComplete: boolean;
    winner: Player | null; // If null and game is complete, is a tie
  };
  
type Game = {
    moves: Move[];
    status: GameStatus;
};
  
type GameState = {
    currentGameMoves: Move[];
    history: {
      currentRoundGames: Game[];
      allGames: Game[];
    };
};

export type { Player, Move, GameStatus, Game, GameState }
