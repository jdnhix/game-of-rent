import React from 'react';
import Button from '@material-ui/core/Button';
import PlayerRadio from '../PlayerRadio/PlayerRadio';
import './PlayerSetup.css';
import TextField from '@material-ui/core/TextField';
import PlayerIcon from '../PlayerIcon/PlayerIcon';
import { connect } from 'react-redux';
import { updatePlayerAvatar } from '../../actions/index';
import {
    withStyles, ThemeProvider,
 } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {createMuiTheme } from '@material-ui/core/styles';




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
            avatarIndex: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updatePlayerAvatar(this.state.avatarIndex);
        document.getElementById(`option${this.state.avatarIndex}`).checked = 0;
        this.props.history.push('/board')
    }



    render() {
        const { classes } = this.props;
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

        const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const avatars = indices.map(index => (
            <>
                <input className='avatar-radio-buttons' id={`option${index}`} onChange={this.handleChange} type='radio' value={index} name='avatarIndex'/>
                <label className='avatar-image' htmlFor={`option${index}`}><PlayerIcon width='5vw' num={index}/></label>
            </>
        ));

        return (
            <div className='backgroundImage'>

                <div className='playerSetupPage'>
                    <div className = "fade-in" style={styles.playerSetup}>

                        <div style={styles.textGrid}>
                            <h1>AVATAR</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div style={styles.fields}>

                                    <div style={styles.avatarSection}>
                                        <h2>Choose an avatar for your player</h2>
                                        <div style={styles.avatarIcons}>
                                            {avatars}
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
        updatePlayerAvatar: avatarIndex => dispatch(updatePlayerAvatar({avatarIndex}))
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
