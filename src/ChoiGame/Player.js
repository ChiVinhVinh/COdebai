import React from "react";
import './Player.css'
const Player=(props)=>{
    return(
        
    <div className="contai">
        <div className="status">
            {props.status.nhacai && <h1 className="h1nhacai">Nhà cái</h1>}
            {props.status.win && <h1 className="h1win">Win</h1>}
            {props.status.lose && <h1 className="h1lose">Lose</h1>}
            {props.status.hoa && <h1 className="h1hoa">Hoa</h1>}
        </div>
        <div className='conPlayer'>
            <h4>Coins:{props.coins}</h4>
            <h4>Username:{props.name}</h4>
            <h4>Point of 3 card: {props.playerData.point}</h4>
            <div className="cardContainer">
                    {props.isRevealed ? (
                        props.playerData.cards.map((card, index) => (
                            <img key={index} className="img" src={card.image} alt={`Card ${index + 1}`} />
                        ))
                    ) : (
                        props.playerData.cards.map((card, index) => (
                            <img key={index} className="img" src="/Tarot-card-of-the-sun-moon-stars-mysterious-galaxy-hand_384222_wh860.png" alt={`Card ${index + 1}`} />
                        
                    )))}         
            </div>
        </div>
    </div>
    )
}
export default Player;