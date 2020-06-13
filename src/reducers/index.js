import {ADD_PLAYER} from '../actions/index';
import {UPDATE_CITY_AND_PLAYER_COUNT} from '../actions/index';
import {UPDATE_PLAYER} from '../actions/index';
import {REMOVE_JOB} from '../actions/index';
import {ADD_FAMILY} from '../actions/index';

const initialState = {
    players: [],
    playerCount: 0,
    city: '',
    jobs: [
        {title: 'Social Worker', income: 2835},
        {title: 'Lawyer', income: 10810},
        {title: 'Hotel Concierge', income: 2195},
        {title: 'Socil Worker', income: 2835},
        {title: 'Lawyr', income: 10810},
        {title: 'Hote Concierge', income: 2195},
        //todo eventually fix this
    ],
    household: [
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' }, //todo should be 8
//         {title: 'Adult, Full-time Caregiver', adult: true, description: 'If you have a child, do not deduct childcare expenses', wage: 0 }, // todo should be 4, add child functionality player
        {title: 'Adult, Retired', adult: true, description: 'Collect $450 in monthly social security benefits', wage: 450 }, //todo should be 4
//         {title: '17 year old child with part-time job', adult: false, description: 'Add $400 to monthly household income', wage: 400 }, //todo should be 4
//         {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 }, //todo should be 8
//         {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 }, //todo should be 8
//         {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 }, //todo should be 8
    ],
    life: [
        {title: 'Eviction Record', description: 'For each neighborhood card you draw, roll the dice. If the number is odd, the landlord denis your application because of a past eviction record.'}, // should be 3
        {title: 'CriminaL Record', description: 'For each neighborhood card you draw, roll the dice. If the number is odd, the landlord denis your application because of a past criminal record.'}, //should be 3
        {title: 'Earn a Promotion', description: 'Get recognized for your hard work and receive a promotion. Increase your monthly salary by 5% before calculating your housing allowance'}, // 4
        {title: 'Student Loans', description: 'The avergae student loan debt in X was Y. Subtract a monthly payment of z from your monthly income '}, // 3
        {title: 'Pay Discrimination', description: 'African American women earn an average of 63 cents to the dollar that white males earn. Reduce your salary by 37% before calculating your housing allowance'}, //3
        {}
    ]


}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_PLAYER:
            return Object.assign({}, state, {
                players: state.players.concat(action.payload)
            });
            break;
        case UPDATE_CITY_AND_PLAYER_COUNT:
            return Object.assign({}, state, {
                playerCount: (action.payload.playerCount),
                city: (action.payload.city)
            });
            break;
        case UPDATE_PLAYER: //todo rename to add job
            return Object.assign({}, state, {
                players: state.players.map((player, index) => index === action.payload.playerId ? {...player, job: action.payload.job} : player)
            });
            break;
         case REMOVE_JOB:
            return Object.assign({}, state, {
                jobs: state.jobs.filter(job => job.title != action.payload.title)
            });
            break;
         case ADD_FAMILY:
            return Object.assign({}, state, {
                players: state.players.map((player, index) => index === action.payload.playerId ? {...player, family: player.family.concat(action.payload.member)} : player)
            });
            break;
    }
    return state;
};

export default rootReducer;