import React from 'react';
import Button from '@material-ui/core/Button';
import PlayerRadio from '../PlayerRadio/PlayerRadio';
import './PlayerSetup.css';
import TextField from '@material-ui/core/TextField';
import PlayerIcon from '../PlayerIcon/PlayerIcon';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/index';
import {
    withStyles, ThemeProvider,
 } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import store from '../../store/index';
import {createMuiTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'; //todo might get rid of this




const theme = createMuiTheme({

        palette: {

            primary: {
                main: '#ffffff',
            }
        ,

        },
  });
const buttonStyle = {
    color: '#ffffff',
    fontWeight: 700,
    border: '2px solid #ffffff',
    margin: 20,
  }
const styles = {
    playerSetup: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textGrid: {
        borderRadius: '1em',
        width: '60vw',
        height: '70vh',
        padding: '2%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '50vh'
    },
    textBox: {
        border: 0,
        width: '20vw',
        height: '5vh',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: '20px',

    },
    avatarSection: {

        width: '100vw',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        marginTop: '2vh',
        alignItems: 'center'

    },
    avatarIcons: {

        width: '60vw',
        maxWidth: '1400px',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2vh',


    },
    cssLabel: {
        color : 'white'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'white !important',
        }
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    },
    root: {
        color: 'white'
    },
    button: {
        color: '#ffffff',
        fontWeight: 700,
        border: '2px solid #ffffff',
        margin: 20,

    },
};
//Creates TextField for player name with the appropriate css
const CssTextField = withStyles({
    root: {

      '& label.MuiFormLabel-root': {
        color: 'white',
      },

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);



class ConnectedPlayerSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            avatarIndex: '',
            setupCount: 1,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPlayer({ playerName: this.state.playerName, avatar: this.state.avatarIndex, family: [], life: [], numCards: 0});
        document.getElementById(`option${this.state.avatarIndex}`).checked = 0;
        this.setState({ playerName: '', avatarIndex: ''});

        if(this.state.setupCount >= this.props.playerCount){
            this.props.history.push('/board')
        } else {
            this.setState({setupCount: this.state.setupCount + 1})
        }
    }



    render() {
        const { classes } = this.props;
        const { playerName } = this.state;
        const { avatarIndex } = this.state;

        let button;
        if (this.state.setupCount >= this.props.playerCount){
            button = <Button type='submit' variant="outlined" color="primary" style={buttonStyle}>
                Finish
            </Button>
        } else {
            button = <Button type='submit' variant="outlined" color="primary" style={buttonStyle}>
                Next
            </Button>
        }


        return (
            <div className='backgroundImage'>

                <div className='playerSetupPage'>
                    <div className = "fade-in" style={styles.playerSetup}>

                        <div style={styles.textGrid}>
                            <h1>Player {this.state.setupCount}</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div style={styles.fields}>

                                    <label htmlFor="playerName">Enter a name for your player</label>
                                    <CssTextField

                                        required
                                        id="playerName"
                                        name='playerName'
                                        label="Player Name"
                                        variant="outlined"
                                        className = "inputLabel"
                                        onChange={this.handleChange}
                                        value={playerName}
                                        style={styles.textBox}
                                        classes={{
                                            root: styles.root
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                root: styles.cssLabel,
                                            },
                                        }}
                                        InputProps={{
                                            //makes input white
                                            style:{
                                                color: 'white'
                                            },
                                            classes: {
                                                root: styles.cssOutlinedInput,
                                                notchedOutline: styles.notchedOutline,
                                            },
                                            inputMode: "numeric"
                                        }}
                                    />


                                    <div style={styles.avatarSection}>
                                        <h2>Choose an avatar for your player</h2>
                                        <div style={styles.avatarIcons}>

                                                <input className='avatar-radio-buttons' id='option0' onChange={this.handleChange} type='radio' value={0} name='avatarIndex' required/>
                                                <label className='avatar-image' htmlFor='option0'><PlayerIcon width='5vw' num={0}/></label>

                                                <input className='avatar-radio-buttons' id='option1' onChange={this.handleChange} type='radio' value={1} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option1'><PlayerIcon width='5vw' num={1}/></label>

                                                <input className='avatar-radio-buttons' id='option2' onChange={this.handleChange} type='radio' value={2} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option2'><PlayerIcon width='5vw' num={2}/></label>

                                                <input className='avatar-radio-buttons' id='option3' onChange={this.handleChange} type='radio' value={3} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option3'><PlayerIcon  width='5vw'  num={3}/></label>

                                                <input className='avatar-radio-buttons' id='option4' onChange={this.handleChange} type='radio' value={4} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option4'><PlayerIcon  width='5vw'  num={4}/></label>

                                                <input className='avatar-radio-buttons' id='option5' onChange={this.handleChange} type='radio' value={5} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option5'><PlayerIcon  width='5vw' num={5}/></label>

                                                <input className='avatar-radio-buttons' id='option6' onChange={this.handleChange} type='radio' value={6} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option6'><PlayerIcon  width='5vw' num={6}/></label>

                                                <input className='avatar-radio-buttons' id='option7' onChange={this.handleChange} type='radio' value={7} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option7'><PlayerIcon  width='5vw' num={7}/></label>

                                                <input className='avatar-radio-buttons' id='option8' onChange={this.handleChange} type='radio' value={8} name='avatarIndex'/>
                                                <label className='avatar-image' htmlFor='option8'><PlayerIcon  width='5vw' num={8}/></label>


                                        </div>
                                    </div>

                                    <ThemeProvider theme={theme}>
                                    <div className={'buttonSection'}>
                                        {button}
                                    </div>
                                    </ThemeProvider>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>





        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPlayer: player => dispatch(addPlayer(player))
    };
}

const mapStateToProps= state => {
    return {
        playerCount: state.playerCount
    }
}

const PlayerSetup = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedPlayerSetup);


export default withRouter(PlayerSetup);
