/* eslint-disable react/jsx-filename-extension */
import { Link } from 'react-router-dom';
import './GameSetupPage.css';
import React, {useEffect} from 'react';
import {
    ThemeProvider,
    makeStyles,
createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { updateCityAndCount, fillingCities } from '../../actions/index';
import { useDispatch } from 'react-redux'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { connect } from 'react-redux';
import { initPlayer } from '../../actions/index';


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

const GET_CITIES = gql`
    query GetCities {
        cities {
            Nickname
        }
    }
`;


function ConnectedGameSetupPage({player, cityList, initPlayer}){
    const classes = useStyles();
    const dispatch = useDispatch();

    const [cityLocation, setCityLocation] = React.useState('');
    
    const { loading, error, data } = useQuery(GET_CITIES);

    useEffect(() => {
        initPlayer();
        console.log(player);
    }, []);

    useEffect(() => {
        // Good!
        if(!loading){
            if(data.cities){
                dispatch(fillingCities({cities: data.cities}));
            }
        }
    }, [loading]);

    const changeCityLocation = (event) => {
        setCityLocation(event.target.value);

    };

    const handleSubmit = () => {
        dispatch(updateCityAndCount({ city: cityLocation}));
    }

    return (
        <ThemeProvider theme={theme}
        >
        <div className='backgroundImage'>
            <div className = "GameSetupPage">

                <p className={'pageTitle'}>CHOOSE A CITY</p>
                <div className = "Questions">

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
                                        {cityList.map((city, index) => <MenuItem key={`city_${index}`} value = {city}> {city}</MenuItem>)}
                                        
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                    </div>

                </div>

                <div className={'buttonSection'}>
                    <Link to='/player'
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



const mapStateToProps= state => {
    return {
        player: state.player,
        cityList: state.cities
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initPlayer: () => dispatch(initPlayer())
    };
}

const GameSetupPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedGameSetupPage);

export default GameSetupPage;
