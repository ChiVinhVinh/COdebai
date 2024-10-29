import React, { useContext } from "react";
import "./ChoiGame.css";
import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import Player from "./Player";
import { styled } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import GameContextProvider, { GameContext } from "./GameContextProvider";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[500],
  },
}));
const Choigame = () => {
  const { players, Deck, isRevealed, onShuffle, onDraw, onReveal, onReset } =
    useContext(GameContext);
  return (
    <Box sx={{ borderRadius: 1,
      bgcolor: green[500], 
      width: "50%",
      height: "100vh",
      margin: "0 auto", 
      padding: 2,
      flexDirection:"column",
      display: "flex",
      justifyContent: "center",
      overflow:"hidden"}}>
    <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
      <Stack direction="row" justifyContent="center">
        <Player
          playerData={players.player1}
          name="player1"
          coins={players.player1.coins}
          status={players.player1.status}
          isRevealed={isRevealed}
        />
      </Stack>
      <Stack spacing={5}
        direction="row"
        justifyContent="center"
        >
        <Player
          playerData={players.player4}
          name="player4"
          coins={players.player4.coins}
          status={players.player4.status}
          isRevealed={isRevealed}
        />
        <Stack spacing={3}
            direction="column"
          >
          <h2 className="h2">DECK CARD {Deck.deckCard}</h2>
          <Stack direction="row" spacing={3}>
           
            <Button variant="contained" size="large" color="warning" onClick={onShuffle}>
                Shuffle
            </Button>
            <Button variant="contained" size="large" color="success" onClick={onDraw}>
                Draw
            </Button>
            <ColorButton variant="contained" size="large" color="inherit" onClick={onReveal}>
            Reveal
            </ColorButton>    
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Button variant="contained" size="large" color="error" onClick={onReset}>
            Reset
            </Button>
            </Stack>
        </Stack>
        <Player
          playerData={players.player2}
          name="player2"
          coins={players.player2.coins}
          status={players.player2.status}
          isRevealed={isRevealed}
        />
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Player
          playerData={players.player3}
          name="player3"
          coins={players.player3.coins}
          status={players.player3.status}
          isRevealed={isRevealed}
        />
      </Stack>
    </Stack>
    </Box>
  );
};
export default () => (
  <GameContextProvider>
    <Choigame />
  </GameContextProvider>
);
