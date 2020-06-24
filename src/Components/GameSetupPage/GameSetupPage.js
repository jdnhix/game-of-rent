/* eslint-disable react/jsx-filename-extension */
import { Link } from 'react-router-dom';
import './GameSetupPage.css';
import React from 'react';
import {
    ThemeProvider,
    makeStyles,
createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { updateCityAndCount } from '../../actions/index';
import { useDispatch } from 'react-redux'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


const theme = createMuiTheme({
    overrides: {

        // this is used to make the outline of the selects white
        MuiOutlinedInput: {
            root:{
                "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                borderColor:'#ffffff',
                },
            },
            focused: {
                borderColor: '#ffffff',
            },
            notchedOutline: {
                borderColor: '#ffffff',
            },
        },


      },

    palette: {

        primary: {
            main: '#ffffff',
        }
    ,

    },
  });

const useStyles = makeStyles((theme) => ({

    button: {
        color: '#ffffff',
        fontWeight: 700,
        border: '2px solid #ffffff',
        margin: 20,

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    outlined: {
        width: 200,
        textAlign: 'center',

    },
    icon: {
        fill: 'white',
    },
    root: {
        color: '#FFFFFF',


    }
}));


function GameSetupPage(){
    const classes = useStyles();
    const dispatch = useDispatch();

    const [numPlayers, setNumPlayers] = React.useState('');
    const [cityLocation, setCityLocation] = React.useState('');


    const changePlayerNum = (event) => {
        setNumPlayers(event.target.value);

    };

    const changeCityLocation = (event) => {
        setCityLocation(event.target.value);

    };

    const handleSubmit = () => {
        dispatch(updateCityAndCount({ playerCount: numPlayers, city: cityLocation}));
    }

    return (
        <ThemeProvider theme={theme}
        >
        <div className='backgroundImage'>
            <div className = "GameSetupPage">

                <p className={'pageTitle'}>Game Setup</p>
                <div className = "Questions">
                    <div className = "Question-1">
                        <p className = "Question-1-text">How many people are playing?</p>
                        <div style={{borderColor: '1 px solid white'}}>
                        <FormControl
                        variant={'outlined'}
                         className={classes.formControl}
                        >

                            <InputLabel id="num-player-select"
                            className="inputLabel"># Players</InputLabel>

                            <Select
                                id="num-player-select"
                                value={numPlayers}
                                onChange={changePlayerNum}
                                className={classes.select}
                                label='# Players'
                                classes={{
                                    root: classes.root,
                                    outlined: classes.outlined,
                                }}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                        notchedOutline: classes.notchedOutline
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>0 (dev)</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                            </Select>

                        </FormControl>
                        </div>
                    </div>

                    <div className = "Question-2">
                        <p className = "Question-2-text">What city do you want to play in?</p>

                        {/*todo jaden check these stylings*/}
                        <div className = "Scrolldowns-cit">
                            <div className="Scrolldowns-cities">

                                <FormControl variant={'outlined'} className={classes.formControl}
                                id="form-1">
                                    <InputLabel labelid="city-select"
                                    className="inputLabel">City</InputLabel>
                                    <Select
                                        id="city-select"
                                        value={cityLocation}
                                        onChange={changeCityLocation}
                                        label='city'
                                        classes={{
                                            root: classes.root,
                                            outlined: classes.outlined,
                                        }}
                                        inputProps={{
                                            classes: {
                                                icon: classes.icon,
                                                notchedOutline: classes.notchedOutline
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {/*<MenuItem value = "Athens"> Athens</MenuItem>*/}
                                        {/*<MenuItem value = "ATLANTA"> Atlanta</MenuItem>*/}
                                        {/*<MenuItem value = "Austin"> Austin</MenuItem>*/}
                                        {/*<MenuItem value = "BILLINGS"> Billings</MenuItem>*/}
                                        {/*<MenuItem value = "BIRMINGHAM"> Birmingham</MenuItem>*/}
                                        {/*<MenuItem value = "Boston"> Boston</MenuItem>*/}
                                        {/*<MenuItem value = "Chattanooga"> Chattanooga</MenuItem>*/}
                                        {/*<MenuItem value = "CHICAGO"> Chicago</MenuItem>*/}
                                        {/*<MenuItem value = "Clarksburg"> Clarksburg</MenuItem>*/}
                                        {/*<MenuItem value = "Columbus"> Columbus</MenuItem>*/}
                                        {/*<MenuItem value = "Durham-Chapel Hill"> Durham-Chapel Hill</MenuItem>*/}
                                        {/*<MenuItem value = "Erie"> Erie</MenuItem>*/}
                                        {/*<MenuItem value = "Knoxville"> Knoxville</MenuItem>*/}
                                        {/*<MenuItem value = "Lehigh Valley"> Lehigh Valley</MenuItem>*/}
                                        {/*<MenuItem value = "Los Angeles"> Los Angeles</MenuItem>*/}
                                        {/*<MenuItem value = "Madison"> Madison</MenuItem>*/}
                                        {/*<MenuItem value = "Memphis"> Memphis</MenuItem>*/}
                                        <MenuItem value = "NASHVILLE"> Nashville</MenuItem>
                                        {/*<MenuItem value = "New York"> New York</MenuItem>*/}
                                        {/*<MenuItem value = "Nottingham"> Nottingham</MenuItem>*/}
                                        {/*<MenuItem value = "Philadelphia"> Philadelphia</MenuItem>*/}
                                        {/*<MenuItem value = "Phoenix"> Phoenix</MenuItem>*/}
                                        {/*<MenuItem value = "Portland"> Portland</MenuItem>*/}
                                        {/*<MenuItem value = "San Francisco"> San Francisco</MenuItem>*/}
                                        {/*<MenuItem value = "Santa Fe"> Santa Fe</MenuItem>*/}
                                        {/*<MenuItem value = "Seattle"> Seattle</MenuItem>*/}
                                        {/*<MenuItem value = "Twin Cities"> Twin Cities</MenuItem>*/}
                                        {/*<MenuItem value = "Washington DC"> Washington DC</MenuItem>*/}
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                    </div>

                </div>

                <div className={'buttonSection'}>
                    <Link to='/players'
                        style={{textDecoration: 'none'}}>
                        <Button onClick={handleSubmit} variant="outlined" classes={{outlined: classes.button}} >
                            Next
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
        </ThemeProvider>


    )
}


export default GameSetupPage;
