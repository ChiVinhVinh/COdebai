const handleReveal = ({players,setPlayers,setIsRevealed,state} ) => {
    const activePlayers = Object.keys(players).filter(playerKey => players[playerKey].active);
    const allPlayersHaveThreeCards = activePlayers.every(playerKey => players[playerKey].cards.length === 3);
    console.log("nhacai:",state.nhacai)
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
export default handleReveal;
