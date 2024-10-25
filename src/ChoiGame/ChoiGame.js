import React from "react";
import './ChoiGame.css';
import Player from './Player';
import { useState } from "react";

const Choigame = (props) => {
    const [Deck, setDeck] = useState({
        deckId: null,
        deckCard: null
    });
    const [players, setPlayers] = useState({
        player1: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} },
        player2: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} },
        player3: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false}},
        player4: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} }
    });
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [state, setLB] = useState({
        nhacai: 1,
        player: 2,
        vong: 1
    });

    const handleShuffle = async () => {
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const data = await response.json();
            if (data.success) {
                setDeck({ deckId: data.deck_id, deckCard: data.remaining });
                console.log('Deck shuffled!', data.deck_id);
            } else {
                console.error('Shuffle failed!');
            }
        } catch (error) {
            console.error('Error fetching shuffle API:', error);
        }
    };

    const handleDraw = async () => {
        if (isDrawing) {
            console.log('Please wait for the current draw to finish.');
            return;
        }
    
        setIsDrawing(true); 
    
        if (!Deck.deckId) {
            console.error("Deck has not been shuffled yet!");
            setIsDrawing(false); 
            return;
        }
    
        if (isRevealed) {
            resetPlayers();
            setLB((prevState) => ({ nhacai: (prevState.nhacai % 4) + 1, player: (prevState.player % 4) + 1, vong: 1 }));
            setIsRevealed(false);
        }
    
        const currentPlayer = players[`player${state.player}`];
        if (!currentPlayer.active || currentPlayer.coins <= 0) {
            console.log(`Player ${state.player} is inactive or out of coins!`);
            setLB(prevState => ({
                ...prevState,
                player: (prevState.player % 4) + 1
            }));
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [`player${state.player}`]: {
                    cards: [], coins: 0, point: 0, active: false,status:{nhacai:false,win:false,lose:false,hoa:false}
                }
            }));
            setIsDrawing(false); // Mở khóa lại sau khi xử lý
            return;
        }
    
        if (currentPlayer.cards.length >= 3) {
            console.log(`Player ${state.player} đã có đủ 3 lá bài!`);
            setIsDrawing(false); 
            return;
        }
    
        if (Deck.deckCard <= 0) {
            await handleShuffle();
            setIsDrawing(false); 
            return;
        }
        if (players[`player${state.nhacai}`].active) {
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [`player${state.nhacai}`]: {
                    ...prevPlayers[`player${state.nhacai}`],
                    status: { ...prevPlayers, nhacai: true }
                }
            }));
        }
        else {
            setLB((prevState) => ({
                ...prevState,
                nhacai: (prevState.nhacai % 4) + 1, 
            }));
            setPlayers((prevPlayers) => ({
                ...prevPlayers,
                [`player${(state.nhacai%4)+1}`]: {
                    ...prevPlayers[`player${(state.nhacai%4)+1}`],
                    status: { ...prevPlayers, nhacai: true }
                }
            }));
        }
        try {
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${Deck.deckId}/draw/?count=1`);
            const data = await response.json();
    
            if (data.success && data.cards.length > 0) {
                const drawnCard = data.cards[0];
                console.log('Card drawn:', drawnCard);
    
                setPlayers((prevPlayers) => ({
                    ...prevPlayers,
                    [`player${state.player}`]: {
                        ...prevPlayers[`player${state.player}`],
                        cards: [...prevPlayers[`player${state.player}`].cards, drawnCard]
                    }
                }));
    
                console.log(`Card added to player ${state.player}`);
    
                if (state.player === state.nhacai) {
                    setLB((prevState) => ({ ...prevState, vong: prevState.vong + 1 }));
                }
    
                setLB((prevState) => ({
                    ...prevState,
                    player: (prevState.player % 4) + 1
                }));
    
                setDeck(prevDeck => ({
                    ...prevDeck,
                    deckCard: prevDeck.deckCard - 1
                }));
            } else {
                console.error('Failed to draw card');
            }
        } catch (error) {
            console.error('Error fetching draw API:', error);
        }
    
        setIsDrawing(false);
    };
    
    const resetPlayers = () => {
        setPlayers(prevPlayers => ({
            player1: { ...prevPlayers.player1, cards: [], point: 0,status:{nhacai:false,win:false,lose:false,hoa:false} },
            player2: { ...prevPlayers.player2, cards: [], point: 0,status:{nhacai:false,win:false,lose:false,hoa:false}},
            player3: { ...prevPlayers.player3, cards: [], point: 0,status:{nhacai:false,win:false,lose:false,hoa:false} },
            player4: { ...prevPlayers.player4, cards: [], point: 0,status:{nhacai:false,win:false,lose:false,hoa:false} }
        }));
    };

    const handleReveal = () => {
        const activePlayers = Object.keys(players).filter(playerKey => players[playerKey].active);
        const allPlayersHaveThreeCards = activePlayers.every(playerKey => players[playerKey].cards.length === 3);
        if (allPlayersHaveThreeCards) {
            const updatedPlayers = Object.keys(players).reduce((acc, playerKey) => {
                const player = players[playerKey];

                    let totalPoints = player.cards.reduce((total, card) => {
                        const cardValue = card.value === "KING" || card.value === "QUEEN" || card.value === "JACK" || card.value === "10" ? 0 :
                            card.value === "ACE" ? 1 :
                                parseInt(card.value) || 0;
                        return total + cardValue;
                    }, 0);
                    while (totalPoints >= 10)
                        totalPoints = totalPoints - 10;
                    acc[playerKey] = { ...player, point: totalPoints };
               
                return acc;
            }, {});
    
            const dealerPoints = updatedPlayers[`player${state.nhacai}`]?.point;
            Object.keys(updatedPlayers).forEach(playerKey => {
                const player = updatedPlayers[playerKey];
                if (playerKey !== `player${state.nhacai}` && player.active) {
                    if (player.point > dealerPoints) {
                        updatedPlayers[playerKey].coins += 900;
                        updatedPlayers[playerKey].status.win = true;
                        updatedPlayers[`player${state.nhacai}`].coins -= 900;
                    } else if (player.point < dealerPoints) {
                        updatedPlayers[`player${state.nhacai}`].coins += 900;
                        updatedPlayers[playerKey].coins -= 900;
                        updatedPlayers[playerKey].status.lose = true;
                    } else {
                        updatedPlayers[playerKey].status.hoa = true;
                    }
                }
            });
    
            setPlayers(updatedPlayers);
            setIsRevealed(true);
           
        }
    };
    

    const handleReset = () => {
        setDeck({ deckId: null, deckCard: null });
        setPlayers({
            player1: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} },
            player2: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} },
            player3: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false}},
            player4: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} }
        });
        setLB({ nhacai: 1, player: 1, vong: 1 });
        console.log("Game reset!");
    };

    return (
        <div className="game-container">
            <div className="div1">
                <Player playerData={players.player1} name="player1" coins={players.player1.coins} status={players.player1.status} isRevealed={isRevealed} />
            </div>
            <div className="div2">
                <Player playerData={players.player4} name="player4" coins={players.player4.coins} status={players.player4.status}  isRevealed={isRevealed} />
                <div className="Content">
                    <h2 className="h2">DECK CARD {Deck.deckCard}</h2>
                    <div className="btArea">
                        <button className="btShuffle" onClick={handleShuffle}>Shuffle</button>
                        <button className="btDraw" onClick={handleDraw}>Draw</button>
                        <button className="btReveal" onClick={handleReveal}>Reveal</button>
                    </div>
                    <div className="bt">
                        <button className="btReset" onClick={handleReset}>Reset</button>
                    </div>
                </div>
                <Player playerData={players.player2} name="player2" coins={players.player2.coins} status={players.player2.status}  isRevealed={isRevealed} />
            </div>
            <div className="div3">
                <Player playerData={players.player3} name="player3" coins={players.player3.coins} status={players.player3.status}  isRevealed={isRevealed} />
            </div>
        </div>
    );
};

export default Choigame;
