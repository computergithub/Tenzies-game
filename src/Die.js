import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
        boxShadow: props.isHeld ?  "#696769 3px 3px 5px " :""
    }
    return (
        <div className="die-face" 
        style={styles} 
        onClick={props.holdDie}
        >
            <h2 className="die-num">{props.values}</h2>
        </div>
    )
}