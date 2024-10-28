import { TDeck } from "../type";
interface ShuffleParams {
  Deck: TDeck;
  setDeck: React.Dispatch<React.SetStateAction<TDeck>>;
}

const handleShuffle = async ({ setDeck }: ShuffleParams): Promise<void> => {
  try {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();

    if (data.success) {
      setDeck({ deckId: data.deck_id, deckCard: data.remaining });
      console.log("Deck shuffled!", data.deck_id);
    } else {
      console.error("Shuffle failed!");
    }
  } catch (error) {
    console.error("Error fetching shuffle API:", error);
  }
};

export default handleShuffle;
