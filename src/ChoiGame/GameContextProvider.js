import React, { createContext, useState } from 'react';
import handleDraw from "./CacNutButton/handleDraw";
import handleReset from "./CacNutButton/handleReset";
import handleReveal from "./CacNutButton/handleReveal";
import handleShuffle from "./CacNutButton/handleShuffle";
export const GameContext = createContext();
const GameContextProvider = ({ children }) => {
    const [Deck, setDeck] = useState({
        deckId: null,
        deckCard: null,
    });
    const [players, setPlayers] = useState({
        player1: { cards: [], coins: 5000, point: 0, active: true, status: { nhacai: false, win: false, lose: false, hoa: false } },
        player2: { cards: [], coins: 5000, point: 0, active: true, status: { nhacai: false, win: false, lose: false, hoa: false } },
        player3: { cards: [], coins: 5000, point: 0, active: true, status: { nhacai: false, win: false, lose: false, hoa: false } },
        player4: { cards: [], coins: 5000, point: 0, active: true, status: { nhacai: false, win: false, lose: false, hoa: false } }
    });
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [state, setLB] = useState({
        nhacai: 1,
        player: 2,
        vong: 1,
    });
    const onShuffle = () => handleShuffle({ Deck, setDeck });
    const onDraw = () => handleDraw({ players, setPlayers, Deck, setDeck, isDrawing, setIsDrawing, isRevealed, setIsRevealed, state, setLB });
    const onReveal = () => handleReveal({ players, setPlayers, isRevealed, setIsRevealed,state});
    const onReset = () => handleReset({ setPlayers, setDeck, setIsRevealed, setLB });
    return (
        <GameContext.Provider value={{
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
        }}>
            {children}
        </GameContext.Provider>
    );
};
export default GameContextProvider;
