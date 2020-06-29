import React from 'react';
import './ResultsPage.css';


const headerStyle = {
    height: '100vh',
    width: 'auto',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'center',
  };

//todo add fade in
function ResultsPage(){
    return (
        <div className='backgroundImage '>
            <div className = 'resultsPage'>
             <header className = {headerStyle}>
                <header className = "ResultsPage-Title">

                    <p className = "Title">
                            Final Results
                    </p>
                </header>


                <div class="boxed">

                    <div class="scores">
                        <p>Results page under construction</p>
                        <p>Thank you for testing the Game of Rent!</p>
                    </div>
                    <br/>
                    {/*<div class="winner">*/}
                    {/*    <p>John Doe Wins!</p>*/}
                    {/*</div>*/}
                </div>






            </header>

            </div>

        </div>
    )


}


export default ResultsPage;
