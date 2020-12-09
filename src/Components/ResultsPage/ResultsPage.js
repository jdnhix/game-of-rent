import React from 'react';
import './ResultsPage.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlayerPopup from '../PlayerCard/PlayerPopup';

const headerStyle = {
    height: '100vh',
    width: 'auto',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'center',
  };

  const buttonStyle = {
    color: '#ffffff',
    fontWeight: 700,
    border: '2px solid #ffffff',
    margin: 20,
  }
//todo add fade in
function ConnectedResultsPage({player}){
    return (
        <div className='backgroundImage '>
            <div className = 'resultsPage'>
             <header className = {headerStyle}>
                <header className = "ResultsPage-Title">

                    <p className = "Title">
                            Final Results
                    </p>
                </header>

                <div className="result-card">
                    <div className='result-player-popup'>
                        <PlayerPopup player={player}/>
                    </div>
                    <Link to='/welcome'>
                        <Button variant='outlined' style={buttonStyle}>REPLAY</Button>
                    </Link>
                </div>

            </header>

            </div>

        </div>
    )


}



const mapStateToProps= state => {
    return {
        player: state.player
    }
}

const ResultsPage = connect(
    mapStateToProps
)(ConnectedResultsPage);

export default withRouter(ResultsPage);
