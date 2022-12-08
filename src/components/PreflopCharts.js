import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

import RangeChart from "./RangeChart";
import Dice from "./dice.png";

function PreflopCharts(){
    const [selections, setSelections] = useState(["", "", ""]);
    const [randomizer, setRandomizer] = useState("--");
    const [frequencies, setFrequencies] = useState(["??", "??", "??", "??"]);
    const [freqFade, setFreqFade] = useState(true);


    const onClickButton = (index, option) => {
        const tempSelections = [...selections];
        tempSelections[index] = option;
        if(index === 0 && option === "RFI"){
            index++;
            tempSelections[index] = "None";
        }
        for(let i = index+1; i < selections.length; i++){
            tempSelections[i] = "";
        }
        setSelections(tempSelections);
    }

    const onClickRandomize = () => {
        const num = Math.floor((Math.random() * 100) + 1).toString();
        setRandomizer(num);
    }

    const onHoverEnter = (freq) => {
        let na = 100 - freq[0] - freq[1] - freq[2];
        freq.push(na.toString())
        setFrequencies(freq);
        setFreqFade(false);
    }

    const onHoverExit = () => {
        setFrequencies(["??", "??", "??", "??"]);
        setFreqFade(true);
    }

    return(
        <div style={{paddingTop: "5em"}}>
            <h1 className="header">200z</h1>
            <div className="preflop-charts-btns-container">
                <div className="btn-group-spacing">
                    <ButtonGroup size="sm">
                    {["RFI", "VS RFI", "RFI VS 3-Bet", "VS 4-Bet"].map((item, i) => { return (
                        <Button key={i} variant={(selections[0] === item ? "light" : "secondary")} onClick={() => onClickButton(0, item)}>{item}</Button>
                    )})}
                    </ButtonGroup>
                </div>
                <div className="btn-group-spacing">
                    <ButtonGroup className="villain-btn-group" size="sm">
                    {["UTG", "HJ", "CO", "BTN", "SB", "BB"].map((item, i) => { return (
                        <Button key={i} variant={(selections[1] === item ? "light" : "secondary")} disabled={!selections[0] || selections[0] === "RFI"} onClick={() => onClickButton(1, item)}>{item}</Button>
                    )})}
                    </ButtonGroup>
                </div>
                <div className="btn-group-spacing">
                    <ButtonGroup className="hero-btn-group" size="sm">
                    {["UTG", "HJ", "CO", "BTN", "SB", "BB"].map((item, i) => { return (
                        <Button key={i} variant={(selections[2] === item ? "light" : "secondary")} disabled={!selections[1] && selections[0] !== "RFI"} onClick={() => onClickButton(2, item)}>{item}</Button>
                    )})}
                    </ButtonGroup>
                </div>
                <div className="btn-group-spacing">
                    <ButtonGroup size="sm">
                        <Button variant="secondary" onClick={() => onClickRandomize()}><img src={Dice} alt="dice" height="17.5em"/></Button>
                        <Button className="btn-inactive" variant="secondary">{randomizer}</Button>
                    </ButtonGroup>
                </div>
            </div>
            <RangeChart selections={selections} onHoverEnter={onHoverEnter} onHoverExit={onHoverExit}/>
            <div className="frequency-display" style={freqFade ? {opacity: "25%"} : {}}>
                <span style={{color: "#EB967E"}}>{frequencies[0]}% Raise</span>
                <span> - </span>
                <span style={{color: "#8BBC8B"}}>{frequencies[1]}% Call</span>
                <span> - </span>
                <span style={{color: "#6CA3C1"}}>{frequencies[2]}% Fold</span>
                <span> - </span>
                <span>{frequencies[3]}% N/A</span>
            </div>
        </div>
    )
}

export default PreflopCharts;