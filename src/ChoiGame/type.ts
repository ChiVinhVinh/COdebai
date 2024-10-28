export interface TDeck {
  deckId: string | null;
  deckCard: number | null;
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
