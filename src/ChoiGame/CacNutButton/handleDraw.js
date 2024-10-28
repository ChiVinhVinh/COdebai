const handleDraw = async ({ isDrawing, setIsDrawing, Deck, setLB, setIsRevealed, setPlayers, isRevealed, state, players, setDeck, handleShuffle }) => {
    const resetPlayers = () => {
        setPlayers(prevPlayers => ({
            player1: { ...prevPlayers.player1, cards: [], point: 0, status: { nhacai: false, win: false, lose: false, hoa: false } },
            player2: { ...prevPlayers.player2, cards: [], point: 0, status: { nhacai: false, win: false, lose: false, hoa: false } },
            player3: { ...prevPlayers.player3, cards: [], point: 0, status: { nhacai: false, win: false, lose: false, hoa: false } },
            player4: { ...prevPlayers.player4, cards: [], point: 0, status: { nhacai: false, win: false, lose: false, hoa: false } }
        }));
    };
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
        setLB(prevState => ({ nhacai: (prevState.nhacai % 4) + 1, player: (prevState.player % 4) + 1, vong: 1 }));
        setIsRevealed(false);
    }

    const currentPlayer = players[`player${state.player}`];
    if (!currentPlayer.active || currentPlayer.coins <= 0) {
        console.log(`Player ${state.player} is inactive or out of coins!`);
        setLB(prevState => ({ ...prevState, player: (prevState.player % 4) + 1 }));
        setPlayers(prevPlayers => ({
            ...prevPlayers,
            [`player${state.player}`]: { cards: [], coins: 0, point: 0, active: false, status: { nhacai: false, win: false, lose: false, hoa: false } }
        }));
        setIsDrawing(false);
        return;
    }

    if (currentPlayer.cards.length >= 3) {
        console.log(`Player ${state.player} has enough cards!`);
        setIsDrawing(false);
        return;
    }

    if (Deck.deckCard <= 0) {
        await handleShuffle();
        setIsDrawing(false);
        return;
    }

    if (players[`player${state.nhacai}`].active) {
        setPlayers(prevPlayers => ({
            ...prevPlayers,
            [`player${state.nhacai}`]: {
                ...prevPlayers[`player${state.nhacai}`],
                status: { ...prevPlayers[`player${state.nhacai}`].status, nhacai: true }
            }
        }));
    } else {
        setLB(prevState => ({ ...prevState, nhacai: (prevState.nhacai % 4) + 1 }));
        setPlayers(prevPlayers => ({
            ...prevPlayers,
            [`player${(state.nhacai % 4) + 1}`]: {
                ...prevPlayers[`player${(state.nhacai % 4) + 1}`],
                status: { ...prevPlayers[`player${(state.nhacai % 4) + 1}`].status, nhacai: true }
            }
        }));
    }

    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${Deck.deckId}/draw/?count=1`);
        const data = await response.json();

        if (data.success && data.cards.length > 0) {
            const drawnCard = data.cards[0];
            console.log('Card drawn:', drawnCard);
            console.log("nhacai:",state.nhacai)
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                [`player${state.player}`]: {
                    ...prevPlayers[`player${state.player}`],
                    cards: [...prevPlayers[`player${state.player}`].cards, drawnCard]
                }
            }));

            console.log(`Card added to player ${state.player}`);

            if (state.player === state.nhacai) {
                setLB(prevState => ({ ...prevState, vong: prevState.vong + 1 }));
            }

            setLB(prevState => ({ ...prevState, player: (prevState.player % 4) + 1 }));
            setDeck(prevDeck => ({ ...prevDeck, deckCard: prevDeck.deckCard - 1 }));
        } else {
            console.error('Failed to draw card');
        }
    } catch (error) {
        console.error('Error fetching draw API:', error);
    }

    setIsDrawing(false);
};

export default handleDraw;
