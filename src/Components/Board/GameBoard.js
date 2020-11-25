import React, {useEffect, useRef} from 'react';
import './GameBoard.css';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Map from './Map';
import PlayerCard from '../PlayerCard/PlayerCard';
import PlayerPopup from '../PlayerCard/PlayerPopup';
import FlippingCard from '../FlippingCard/FlippingCard';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import OccupationCardBack from '../Card/img/GameOfRent_OccupationBack.jpg';
import LifeCardBack from '../Card/img/GameOfRent_LifeBack.jpg';
import NeighborhoodCardBack from '../Card/img/GameOfRent_NeighborhoodBack.jpg';
import HouseholdCardBack from '../Card/img/GameOfRent_HouseholdBack.jpg';
import Calculator from './img/calculator.png';
import MathBox from '../MathBox/MathBox'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router"
import {Link} from 'react-router-dom'
import { fillJobs, fillNeighborhoods } from '../../actions/index'
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks";
import PlayerIcon from '../PlayerIcon/PlayerIcon'
import {updateCityAndCount} from '../../actions'

function showCardFullscreen(ref, cardId, cardProps) {
    document.getElementById("overlay").style.display = "block"; // TODO getting by id is probably bad
    ref.startForRightCard(document.getElementById(cardId), cardProps);
}
function closeFullscreenCard(ref) {
    ref.goFromCenter(() => document.getElementById("overlay").style.display = "none"); //todo delete
}
const GET_CITY = gql`
    query GetCity($name: String){
        city(query: { Nickname: $name }){
            lat
            long
            Nickname
            FMR {
                STUDIO
                ONE
                TWO
                THREE
                FOUR
            }
            jobs {
                title
                income
            }
            neighborhoods {
                neighborhood
                location
                rent1 {
                   type
                   cost
               }
               rent2 {
                   type
                   cost
               }
               rent3 {
                   type
                   cost
               }
               rent4 {
                   type
                   cost
               }
           }
        }
    }
`;

const buttonStyle = {
    color: '#ffffff',
    fontWeight: 700,
    border: '2px solid #ffffff',
    margin: 0,
    height: '1vh',
}

function ConnectedGameBoard({playerList, city, jobList, householdList, lifeList, neighborhoodList}) {
    // HOOKS
    const dispatch = useDispatch(); //todo delete
    const history = useHistory();

    console.log('*********************************')
    //DATABASE
    const { loading, error, data } = useQuery(GET_CITY, {
        variables: { name: city }
    });
    console.log(loading, error, data)
    console.log('*********************************')
    
    useEffect(() => {
        console.log(error)
        if(!loading){
            if(data.city){
                dispatch(fillJobs({jobs: data.city.jobs}));
                dispatch(fillNeighborhoods({neighborhoods: data.city.neighborhoods}));
            }
        }
    }, [loading]);

    // console.log(data)

    const makePricesIntoString = l => " " + (l.map(a => "$" + a).join(" + ") || "$0") //todo this might be useful

    // LOCAL STATE
    const [playerTurn, setPlayerTurn] = React.useState(0); // player 1's turn is presented by a 0
    const [diceRoll, setDiceRoll] = React.useState(0);
    const [lifeCount, setLifeCount] = React.useState(1);
    const [instructionStep, setInstructionStep] = React.useState(0);
    const [gameInstructionStep, setGameInstructionStep] = React.useState(0)
    const [playerPopupLocation, setPlayerPopupLocation] = React.useState();
    const [markers, setMarkers] = React.useState([]);
    const [housing, setHousing] = React.useState('') //todo find a better way to do this is sloppy

    const [showPlayerPopup, setShowPlayerPopup] = React.useState(false)
    const [showInstBox, setShowInstBox] = React.useState(true);
    const [showMathBox, setShowMathBox] = React.useState(false);
    const [showGameBox, setShowGameBox] = React.useState(false);
    const [showNeighborhoodChoice, setShowNeighborhoodChoice] = React.useState(false);


    const centerLat = 36.1627;
    const centerLong = -86.7816;

    //used to determine position
    let diamLong = 0.1713 //calculated by hand right now – should always be same if resolution/zoom doesn't change
    let diamLat = -0.1077;//calculated by hand right now – should always be same if resolution/zoom doesn't change
    let incrementLong = diamLong / 14;
    let incrementLat = diamLat / 14;

    //left-most position
    let leftLong = centerLong - (diamLong / 2);
    // var movingLong = leftLong;

    //top-most position on grid
    let topLat = centerLat - (diamLat / 2);

    //INSTRUCTIONS
    const nextInstruction = (type) => {
        switch (type) {
            case 'solo':
                setInstructionStep(6);
                break;
            case 'working':
                setInstructionStep(4)
                break;
            case 'familyDone':
                setInstructionStep(5)
                break;
            case 'family':
                setInstructionStep(3)
                break;
            case 'life':
                setInstructionStep(7)
                break;
            case 'done':
                setInstructionStep(8)
                calcInfo();
                break;
            default:
                setInstructionStep(instructionStep + 1);
        }
    }
    const InstructionText = [
        `Welcome to the Game of Rent! You will now take on the role of a person in ${city} searching for affordable housing. It is your job to find the best housing for you and your family considering all your circumstances. Let's find out more about your character; click on the yellow card to discover your occupation!`,
        "Now that you have your occupation, it's time to determine your household! Click on the die to roll for the number of family members you'll have.",
        `That means you have ${diceRoll} other family member(s) in your household. Click on the pink deck to draw a household card and draw an occupation card if that family member is of working age.`,
        `You have ${diceRoll} member(s) left. Please draw a household card for your next family member.`,
        'Please draw an occupation card for this family member.',
        'Your family is complete, but everyone has unforeseen circumstances arise in their lives. Draw a life card for each adult in your household including yourself!',
        'You\'re the only member of your household! Everyone has unforeseen circumstances arise in their lives. Click on the green deck to draw a life card for yourself.',
        'Please draw another life card.',
        'Your household is finally set! Now click on the calculator icon to find out your monthly housing allowance. This is how much you can afford to spending on housing each month.',
        ''
    ];
    const GameLoopInstructionText = [
        'Draw a Neighborhood card to look for a location that suits you and your family!',
        'All players have successfully found housing! Please click here to proceed to the result page and calculate scores.'
        //todo add more types of text
    ]

    //CARD FLIPPING
    const xFunction = () => flippingCardRef.current.goFromCenter(() => document.getElementById("overlay").style.display = "none");
    const flippingCardRef = React.createRef();

    //GAMEPLAY HANDLERS
    const handleDiceRoll = (num) => {
        if(instructionStep === 1){
            setDiceRoll(num - 1);
            if(num === 1){
                nextInstruction('solo')
            } else {
                nextInstruction()
            }
        }
    }
    const handleCardDraw = (type) => {
        switch (type) {
            case 'occupation':
                const index = Math.floor(Math.random() * jobList.length)
                if(instructionStep === 0) {

                    const job = jobList.splice(index, 1)[0];
                    showCardFullscreen(flippingCardRef.current, "occupationCardBack",   ["Occupation", job]);
                    nextInstruction();
                    playerList[playerTurn].job = job;

                } else if( instructionStep === 4) {

                    const job = jobList.splice(index, 1)[0];
                    showCardFullscreen(flippingCardRef.current, "occupationCardBack",   ["Occupation", job]);
                    const end = playerList[playerTurn].family.length - 1;
                    playerList[playerTurn].family[end].job = job;

                    if(diceRoll <= 0) {
                        nextInstruction('familyDone')
                    } else {
                        nextInstruction('family')
                    }
                }

                break;
            case 'household':
                if(instructionStep === 2 || instructionStep === 3){
                    setDiceRoll(diceRoll - 1);

                    const index = Math.floor(Math.random() * householdList.length)
                    const member = householdList.splice(index, 1)[0];
                    showCardFullscreen(flippingCardRef.current, "householdCardBack",   ["Household", member]);

                    if(member.wage === 'draw'){
                        nextInstruction('working')
                    } else if(diceRoll <= 1) {
                        nextInstruction('familyDone')
                    } else {
                        nextInstruction('family')
                    }

                    if(member.adult) setLifeCount(lifeCount + 1);
                    playerList[playerTurn].family.push(member);
                }

                break;
            case 'life':
                if(instructionStep === 5 || instructionStep === 6 || instructionStep === 7){
                    setLifeCount(lifeCount - 1);

                    const index = Math.floor(Math.random() * lifeList.length)
                    const life = lifeList.splice(index, 1)[0];
                    showCardFullscreen(flippingCardRef.current, "lifeCardBack",   ["Life", life]);

                    playerList[playerTurn].life.push(life);

                    if(lifeCount === 1){
                        nextInstruction('done')
                    } else {
                        nextInstruction('life')
                    }
                }

                break;
            case 'neighborhood':
                if(instructionStep === 9){
                    setShowNeighborhoodChoice(false);
                    playerList[playerTurn].numCards++; // todo also need ot increase draw count

                    let index = Math.floor(Math.random() * neighborhoodList.length)
                    const neighborhood = neighborhoodList.splice(index, 1)[0];
                    setHousing(neighborhood);

                    if(livable(neighborhood)) setShowNeighborhoodChoice(true);
                    showCardFullscreen(flippingCardRef.current, "neighborhoodCardBack",   ["Neighborhood", neighborhood]);

                }

                break;
        }
    }
    const handleCalculatorButton = () => {
        if(instructionStep === 8){
            setShowInstBox(false)
            setShowMathBox(true);
        }
    }

    const handleNeighborhoodChoice = (response) => {
        switch(response) {
            case 'no':
                nextPlayerGame()
                break;
            case 'yes':
                playerList[playerTurn].housing = housing;

                console.log(housing);

                let movingLong = leftLong;
                let movingLat = topLat;
                //top-most position on grid
                //assuming housing itself is a string w/ 'K4' (wasn't sure if it was housing or a field within it -

                //the code right now is as if the object housing = 'K4'
                let letter = housing.location.toString().charAt(0);
                let number = housing.location.toString().charAt(1);

                //determine latitude based on letter (C,K,etc.)
                while (letter !== 'A'){
                    letter = String.fromCharCode(letter.charCodeAt(0) - 1);
                    movingLat += incrementLat;
                }
                //topLat now at appropriate lat

                //determine longitutde based on number
                while (number !== '1'){
                    number = String.fromCharCode(number.charCodeAt(0) - 1);
                    movingLong += incrementLong;
                }

                const location ={
                    position: [movingLat, movingLong],
                    description: `${playerList[playerTurn].playerName}'s residence`
                }

                addMarker(location)
                nextPlayerGame();
                break;
        }
    }
    const nextPlayerSetup = () => {
        if(playerTurn === playerList.length - 1){
            setPlayerTurn(0);
            setInstructionStep(9)
            setShowGameBox(true);
        } else {
            setInstructionStep(0)
            setShowInstBox(true);
            setPlayerTurn(playerTurn + 1);
            setDiceRoll(null);
            setLifeCount(1);
        }
    }
    const nextPlayerGame = () => {
        if(playerTurn === playerList.length - 1){
            setPlayerTurn(0);
            console.log('looping over!');
        } else {
            setPlayerTurn(playerTurn + 1);
        }

        let done = true;
        for(let x = 0; x < playerList.length; ++x) {
            if(!playerList[x].housing) done = false;
        }

        if(done) {
            setGameInstructionStep(gameInstructionStep + 1);
            // history.push({
            //     pathname: '/results'
            // })
        } else {
            let newTurn = playerTurn + 1;
            if(newTurn >= playerList.length) newTurn = 0;
            while(playerList[newTurn].housing){
                newTurn++;
                if(newTurn >= playerList.length) newTurn = 0;
            }
            setPlayerTurn(newTurn);
        }

    }
    const addMarker = (location) => {
        const newMarkers = markers
        newMarkers.push(location)
        setMarkers(newMarkers);
        // [36.1627, -86.7816]
    }

    const calcInfo = () =>{
        let householdMonthlyIncome = playerList[playerTurn].job.income;
        let adultCount = 1
        let kidCount = 0;

        playerList[playerTurn].family.forEach((member) => {
            if(member.adult){
                adultCount++;
            } else {
                kidCount++;
            }
            if(member.job) {
                householdMonthlyIncome += member.job.income
            } else {
                householdMonthlyIncome += member.wage;
            }
        })

        //todo add life cards into effect

        const annualIncome = householdMonthlyIncome * 12;
        const incomeBracket = playerList[playerTurn].family.length
        let minimumNumBedrooms = Math.ceil(adultCount/2) + Math.ceil(kidCount/3)

        playerList[playerTurn].info = {
            householdMonthlyIncome: householdMonthlyIncome,
            monthlyHousingAllowance: householdMonthlyIncome * .3,
            minimumNumBedrooms: minimumNumBedrooms,
            housingAssistance: (annualIncome < sampleIncomeLimit[incomeBracket])
        }
    }
    const livable = (neighborhood) => {
        const minNumBed = playerList[playerTurn].info.minimumNumBedrooms;
        const {monthlyHousingAllowance} = playerList[playerTurn].info
        let res = false;

        for(let [key, value] of Object.entries(neighborhood)){
            if(key !== 'neighborhood' && key !== 'location' && value){
                const numRooms = convertTypeHousing(value.type);
                if(numRooms >= minNumBed && value.cost <=  monthlyHousingAllowance) {
                    res = true;
                }
            }
        }

        return res;
    }
    const convertTypeHousing = (type) =>{
        switch (type) {
            case 'STUDIO':
                return 1;
            case '1BR':
                return 1;
            case '2BR':
                return 2;
            case '3BR':
                return 3;
            case '4BR':
                return 4;
        }
    }

    const closeMathBox = () => {
        setShowMathBox(false);
        nextPlayerSetup();
    }
    const togglePlayerPopup = (playerIndex) => {
        if(!showPlayerPopup){
            document.getElementById("overlay").style.display = "block";
            setPlayerPopupLocation(playerIndex);
            setShowPlayerPopup(true);
            setShowNeighborhoodChoice(false); //todo this might not be correct
        } else {
            document.getElementById("overlay").style.display = "none";
            setShowPlayerPopup(false);
        }
    }

    const sampleIncomeLimit = [31500, 36000, 41560, 50200, 58840, 67480]


    return (
        <div className='root '>

            {showInstBox &&
                <div>
                    <ReactCSSTransitionGroup
                        transitionName='fade'
                        transitionAppear={true}
                        transitionAppearTimeout={5000}>
                        <div className='instruction-section'>
                            <h3>{playerList[playerTurn].playerName}</h3>
                            <div>
                                <p>{InstructionText[instructionStep]}</p>
                            </div>
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            }

            {showGameBox &&
                <div>
                    <ReactCSSTransitionGroup
                        transitionName='fade'
                        transitionAppear={true}
                        transitionAppearTimeout={5000}>
                        <div className='gamebox-background'>
                            <h3>{playerList[playerTurn].playerName}</h3>
                            <p>{GameLoopInstructionText[gameInstructionStep]}</p>
                            {(gameInstructionStep === 1) &&
                                <Link to='/results'>
                                    <Button variant='outlined' style={buttonStyle} >Next</Button>
                                </Link>
                            }
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            }


            {showPlayerPopup &&
            <ReactCSSTransitionGroup
                transitionName='fade-fast'
                transitionAppear={true}
                transitionAppearTimeout={2500}
                // transitionLeave={true}
                transitionLeaveTimeout={30000}>
                <div className='player-popup'>
                    <PlayerPopup player={playerList[playerPopupLocation]} onClick={() => togglePlayerPopup()}/>
                </div>
            </ReactCSSTransitionGroup>
            }

            <div className='dice-section'>
                <ReactDice
                    numDice={1}
                    faceColor="#ffffff"
                    dotColor="#000000"
                    rollDone={num => handleDiceRoll(num)}
                    className='dice'
                />
            </div>

            <div className='calculator-section' onClick={handleCalculatorButton}>
                <img class='calculator-image' src={Calculator}></img>
            </div>

            {showMathBox &&
            <ReactCSSTransitionGroup
                transitionName='fade-fast'
                transitionAppear={true}
                transitionAppearTimeout={2500}>
                <div className='calculator-panel' onClick={closeMathBox}>
                    <MathBox info={playerList[playerTurn].info}/>

                </div>
            </ReactCSSTransitionGroup>
            }

            <ReactCSSTransitionGroup
                transitionName='fade-fast'
                transitionAppear={true}
                transitionAppearTimeout={2500}>
            {/*todo need to eventually move this styling out of here*/}
            <div id="overlay" style={{height:"100%", width:"100%", backgroundColor:"rgba(0,0,0, 0.7)", zIndex:2, position:"fixed", display:"none"}}>
                {(!showPlayerPopup && (instructionStep !== 9)) &&
                    <p onClick={xFunction} style={{position:"fixed",left:"80%",color:"white",fontWeight:"bold",cursor:"pointer",fontSize:40}}>X</p>
                }
                <FlippingCard ref={flippingCardRef} startSize={[0, 0]} startXY={[0, 0]} />

                {(instructionStep === 9 && showNeighborhoodChoice) &&
                    <div className='choice'>
                        {/*// todo maybe add player name here*/}
                        <h2>This location meets the requirements for your family and is within your monthly housing allowance. Would you like to live here?</h2>
                        <div className='choice-section'>
                            <Button variant='contained' className='choice-button' onClick={() =>{xFunction(); handleNeighborhoodChoice('yes')}}>Yes</Button>
                            <Button variant='contained' className='choice-button' onClick={() => {xFunction(); handleNeighborhoodChoice('no')}}>No</Button>
                        </div>
                    </div>
                }

                {(instructionStep === 9 && !showNeighborhoodChoice) &&
                    <div className='choice'>
                        <h2 style={{color:'white', textAlign: 'center'}}>This location does not meet the requirements for your family.</h2>
                        <div className='choice-section'>
                            <Button variant='contained' className='choice-button' onClick={() => {xFunction(); handleNeighborhoodChoice('no')}}>Ok</Button>
                        </div>
                    </div>
                }

            </div>
            </ReactCSSTransitionGroup>

            <div className='playercard-section'>
                    {playerList.map((player, index) => (
                        <div className={(playerTurn === index) ? 'current-player' : '' }>
                            <PlayerCard btnId="info1" playerName={player.playerName} avatar={player.avatar} onClick={() => togglePlayerPopup(index)}/>
                        </div>
                    ))}
                </div>

            <div className='map'>
                <Map markers={markers} lat={data && data.city &&  data.city.lat} long={data && data.city && data.city.long}/>
            </div>

            <div className='gamecard-section '>
                <img style={{ height: '20vh', borderRadius: '10px' }} id="occupationCardBack"   src={OccupationCardBack}  className="card" alt="OccupationCardBack" onClick={() => handleCardDraw('occupation')} />
                <img style={{ height: '20vh', borderRadius: '10px' }} id="householdCardBack"   src={HouseholdCardBack}  className="card" alt="HouseholdCardBack" onClick={() =>  handleCardDraw('household')} />
                <img style={{ height: '20vh', borderRadius: '10px' }} id="lifeCardBack"  src={LifeCardBack}  className="card" alt="LifeCardBack" onClick={() => handleCardDraw('life')} />
                <img style={{ height: '20vh', borderRadius: '10px' }} id="neighborhoodCardBack" src={NeighborhoodCardBack} className="card" alt="NeighborhoodCardBack" onClick={() => handleCardDraw('neighborhood')} />
            </div>
        </div>
    );
}

const mapStateToProps= state => {
    return {
        playerList: state.players,
        city: state.city,
        jobList: state.jobs,
        householdList: state.household,
        lifeList: state.life,
        neighborhoodList: state.neighborhoods
    }
}

const GameBoard = connect(
    mapStateToProps,
)(ConnectedGameBoard);



export default GameBoard;
