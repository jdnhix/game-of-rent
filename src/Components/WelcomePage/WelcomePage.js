/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './WelcomePage.css'
import {Link} from 'react-router-dom'

import logo from './changeplusplus.png'

const headerStyle = {
  height: '100vh',
  width: 'auto',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline',
  justifyContent: 'center',
};

const textGrid = {

  borderRadius: '1em',
  width: '65vw',
  maxWidth: 1000,
  height: '50vh',
  maxHeight: 400,
  padding: '2%',
  textAlign: 'center',
  fontSize: '1.5em',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center'

};

const buttonStyle = {
  color: '#ffffff',
  fontWeight: 700,
  border: '2px solid #ffffff',
  margin: 20,
}


function WelcomePage() {
  // const classes = useStyles();

  return (

      <div className='backgroundImage'>
        <div className={'welcomePage'}>
          <header className='fade-in' style={headerStyle}>
            <div className = 'text-grid' style={textGrid}>
                <div className='title'>
                  <h1> Welcome to the Game of Rent! </h1>
                </div>

                <p className="WelcomePage-introText">
                  More and more American families and individuals are finding
                  it increasingly difficult to live
                  somewhere they can afford. In the Game of Rent, each player
                  will have to make the most of what
                  they’ve given and find an apartment you can afford to rent
                  as close to your job as possible.
                </p>

                <Link to='/setup'
                style={{textDecoration: 'none'}}>
                  <Button variant="outlined" style={buttonStyle}>
                    Start
                  </Button>
                </Link>

                <div className='club-logo'>
                    {/*todo make this label look better*/}
                    <label htmlFor='logo'>Developed by</label>
                    <a href='http://changeplusplus.org/'>
                        <img className='club-logo-image' id='logo' src={logo} />
                    </a>
                </div>

            </div>



          </header>
        </div>
      </div>

  );
}

export default WelcomePage;
