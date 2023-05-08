import './Scoreboard.css'

type Props = {
    playerOneWins: number,
    playerTwoWins: number,
    ties: number
}

const Scoreboard = ({ playerOneWins, playerTwoWins, ties }: Props) => {
    return (
        <>
            <div className="score shadow" style={{ backgroundColor: "var(--player-one)" }}>
                <p>Player 1</p>
                <span data-id="p1-wins">{playerOneWins} Wins</span>
            </div>
            <div className="score shadow" style={{ backgroundColor: "var(--light-gray)" }}>
                <p>Ties</p>
                <span data-id="ties">{ties}</span>
            </div>
            <div className="score shadow" style= {{ backgroundColor: "var(--player-two)" }}>
                <p>Player 2</p>
                <span data-id="p2-wins">{playerTwoWins} Wins</span>
            </div>
        </>
    )
}

export default Scoreboard;