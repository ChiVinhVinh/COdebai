import React, { createContext, useState, ReactNode } from "react";
import handleDraw from "./CacNutButton/handleDraw";
import handleReset from "./CacNutButton/handleReset";
import handleReveal from "./CacNutButton/handleReveal";
import handleShuffle from "./CacNutButton/handleShuffle";
import { TDeck, TPlayers, TState } from "./type";
export const GameContext = createContext<any>(null);

interface GameContextProviderProps {
  children: ReactNode;
}

const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
}) => {
  const [Deck, setDeck] = useState<TDeck>({
    deckId: null,
    deckCard: null,
  });

  const [players, setPlayers] = useState<TPlayers>({
    player1: {
      cards: [],
      coins: 5000,
      point: 0,
      active: true,
      status: { nhacai: false, win: false, lose: false, hoa: false },
    },
    player2: {
      cards: [],
      coins: 5000,
      point: 0,
      active: true,
      status: { nhacai: false, win: false, lose: false, hoa: false },
    },
    player3: {
      cards: [],
      coins: 5000,
      point: 0,
      active: true,
      status: { nhacai: false, win: false, lose: false, hoa: false },
    },
    player4: {
      cards: [],
      coins: 5000,
      point: 0,
      active: true,
      status: { nhacai: false, win: false, lose: false, hoa: false },
    },
  });

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const [state, setLB] = useState<TState>({
    nhacai: 1,
    player: 2,
    vong: 1,
  });

  const onShuffle = () => handleShuffle({ Deck, setDeck });
  const onDraw = () =>
    handleDraw({
      players,
      setPlayers,
      Deck,
      setDeck,
      isDrawing,
      setIsDrawing,
      isRevealed,
      setIsRevealed,
      state,
      setLB,
      handleShuffle: onShuffle,
    });
  const onReveal = () =>
    handleReveal({ players, setPlayers, setIsRevealed, state });
  const onReset = () => handleReset({ setPlayers, setDeck, setLB });

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        Deck,
        setDeck,
        isDrawing,
        setIsDrawing,
        isRevealed,
        setIsRevealed,
        state,
        setLB,
        onShuffle,
        onDraw,
        onReveal,
        onReset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
