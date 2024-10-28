import React, { useContext } from "react";
import "./ChoiGame.css";
import Player from "./Player";
import GameContextProvider, { GameContext } from "./GameContextProvider";
const Choigame = () => {
  const { players, Deck, isRevealed, onShuffle, onDraw, onReveal, onReset } =
    useContext(GameContext);
  return (
    <div className="game-container">
      <div className="div1">
        <Player
          playerData={players.player1}
          name="player1"
          coins={players.player1.coins}
          status={players.player1.status}
          isRevealed={isRevealed}
        />
      </div>
      <div className="div2">
        <Player
          playerData={players.player4}
          name="player4"
          coins={players.player4.coins}
          status={players.player4.status}
          isRevealed={isRevealed}
        />
        <div className="Content">
          <h2 className="h2">DECK CARD {Deck.deckCard}</h2>
          <div className="btArea">
            <button className="btShuffle" onClick={onShuffle}>
              Shuffle
            </button>
            <button className="btDraw" onClick={onDraw}>
              Draw
            </button>
            <button className="btReveal" onClick={onReveal}>
              Reveal
            </button>
          </div>
          <div className="bt">
            <button className="btReset" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
        <Player
          playerData={players.player2}
          name="player2"
          coins={players.player2.coins}
          status={players.player2.status}
          isRevealed={isRevealed}
        />
      </div>
      <div className="div3">
        <Player
          playerData={players.player3}
          name="player3"
          coins={players.player3.coins}
          status={players.player3.status}
          isRevealed={isRevealed}
        />
      </div>
    </div>
  );
};
export default () => (
  <GameContextProvider>
    <Choigame />
  </GameContextProvider>
);
