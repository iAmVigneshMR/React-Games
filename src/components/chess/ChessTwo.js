import { Chessboard } from "react-chessboard";
import { useState } from 'react';
import "./../../css/chess/chess.css";

const ChessTwo = () => {
    const [flipped, setFlipped] = useState("white");
    return (
        <div id="chessContainer">
            <h1>&lt;chess-board&gt; and React</h1>
            <p>Here is &lt;chess-board&gt; inside a React app!</p>
            <Chessboard
                position="start"
                orientation={flipped ? 'black' : 'white'}
                draggable-pieces
            //   ref={(e) => this.state.board = e}
            />
            {/* <button onClick={() => this.state.board.flip()}>Flip Board</button>
        <button onClick={() => this.state.board.clear()}>Clear Board</button>
        <button onClick={() => this.state.board.setPosition('start')}>Start Position</button> */}
        </div>
    )
}

export default ChessTwo