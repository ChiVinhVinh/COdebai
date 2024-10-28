const handleReset = ({setDeck,setPlayers,setLB}) => {
    setDeck({ deckId: null, deckCard: null });
    setPlayers({
        player1: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} },
        player2: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} },
        player3: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false}},
        player4: { cards: [], coins: 5000, point: 0, active: true,status:{nhacai:false,win:false,lose:false,hoa:false} }
    });
    setLB({ nhacai: 1, player: 2, vong: 1 });
    console.log("Game reset!");
};
export default handleReset;