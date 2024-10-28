export interface TDeck {
  deckId: string | null;
  deckCard: number | null;
}
interface PlayerStatus {
  nhacai: boolean;
  win: boolean;
  lose: boolean;
  hoa: boolean;
}

interface Card {
  image: string;
  value: string;
}

interface PlayerData {
  point: number;
  cards: Card[];
}

export interface PlayerProps {
  playerData: PlayerData;
  name: string;
  coins: number;
  status: PlayerStatus;
  isRevealed: boolean;
}
export interface TPlayerStatus {
  nhacai: boolean;
  win: boolean;
  lose: boolean;
  hoa: boolean;
}

export interface TPlayer {
  cards: any[];
  coins: number;
  point: number;
  active: boolean;
  status: TPlayerStatus;
}

export interface TPlayers {
  player1: TPlayer;
  player2: TPlayer;
  player3: TPlayer;
  player4: TPlayer;
  [key: `player${number}`]: TPlayer;
}

export interface TState {
  nhacai: number;
  player: number;
  vong: number;
}
