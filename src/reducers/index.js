import {ADD_PLAYER} from '../actions/index';
import {UPDATE_CITY_AND_PLAYER_COUNT} from '../actions/index';
import {UPDATE_PLAYER} from '../actions/index';
import {REMOVE_JOB} from '../actions/index';
import {ADD_FAMILY} from '../actions/index';
import {FILL_JOBS} from '../actions/index';
import {FILL_NEIGHBORHOODS} from '../actions/index';


const initialState = {
    players: [],
    playerCount: 0,
    city: '',
    jobs: [
        {title: 'Social Worker', income: 2835},
        {title: 'Lawyer', income: 10810},
        {title: 'Lawyer', income: 10810},
        {title: 'Lawyer', income: 10810},
        {title: 'Hotel Concierge', income: 2195},
        {title: 'Social Worker', income: 2835},
        {title: 'Lawyer', income: 10810},
        {title: 'Hotel Concierge', income: 2195},
    ],
    neighborhoods: [
        {neighborhood: 'SYLVAN PARK', rent1: {type: '2BR', cost: 1995}, rent2: {type: '3BR', cost: 2890},  location: 'K4'},
        {neighborhood: 'THE GULCH', rent1: {type: 'STUDIO', cost: 980}, rent2: {type: '1BR', cost: 1120}, rent3: {type: '2BR', cost: 1460}, rent4: {type: '3BR', cost: 1726}, location: 'K5'},
        {neighborhood: 'HERMITAGE', rent1: {type: 'STUDIO', cost: 1402}, rent2: {type: '1BR', cost: 1476}, rent3: {type: '2BR', cost: 1726}, location: 'K6'},
        {neighborhood: 'ANTIOCH', rent1: {type: '2BR', cost: 1995}, rent2: {type: '3BR', cost: 2890}, location: 'K3'},
        {neighborhood: 'EDGEHILL', rent1: {type: 'STUDIO', cost: 980}, rent2: {type: '1BR', cost: 1120}, rent3: {type: '2BR', cost: 1460}, rent4: {type: '3BR', cost: 100}, location: 'K7'},
        {neighborhood: 'FIVE POINTS', rent1: {type: 'STUDIO', cost: 1402}, rent2: {type: '1BR', cost: 1476}, rent3: {type: '2BR', cost: 1726}, location: 'K8'},
        {neighborhood: 'GREEN HILLS', rent1: {type: '2BR', cost: 1995}, rent2: {type: '3BR', cost: 100}, location: 'K1'},
    ],
    household: [
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Employed full-time', adult: true, description: 'Draw one occupation card', wage: 'draw' },
        {title: 'Adult, Full-time Caregiver', adult: true, description: 'If you have a child, do not deduct childcare expenses', wage: 0 }, ///todo add child functionality
        {title: 'Adult, Full-time Caregiver', adult: true, description: 'If you have a child, do not deduct childcare expenses', wage: 0 },
        {title: 'Adult, Full-time Caregiver', adult: true, description: 'If you have a child, do not deduct childcare expenses', wage: 0 },
        {title: 'Adult, Full-time Caregiver', adult: true, description: 'If you have a child, do not deduct childcare expenses', wage: 0 },
        {title: 'Adult, Retired', adult: true, description: 'Collect $450 in monthly social security benefits', wage: 450 },
        {title: 'Adult, Retired', adult: true, description: 'Collect $450 in monthly social security benefits', wage: 450 },
        {title: 'Adult, Retired', adult: true, description: 'Collect $450 in monthly social security benefits', wage: 450 },
        {title: 'Adult, Retired', adult: true, description: 'Collect $450 in monthly social security benefits', wage: 450 },
        {title: '17 year old child with part-time job', adult: false, description: 'Add $400 to monthly household income', wage: 400 },
        {title: '17 year old child with part-time job', adult: false, description: 'Add $400 to monthly household income', wage: 400 },
        {title: '17 year old child with part-time job', adult: false, description: 'Add $400 to monthly household income', wage: 400 },
        {title: '17 year old child with part-time job', adult: false, description: 'Add $400 to monthly household income', wage: 400 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '7 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '5 year old child' , adult: false, description: 'Subtract $300 from monthly household income to pay for childcare', wage: -300 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
        {title: '2 year old child' , adult: false, description: 'Subtract $400 from monthly household income to pay for childcare', wage: -400 },
    ],
    life: [
        {title: 'Eviction Record', description: 'For each neighborhood card you draw, roll the dice. If the number is odd, the landlord denies your application because of a past eviction record.'}, // should be 3
        {title: 'Criminal Record', description: 'For each neighborhood card you draw, roll the dice. If the number is odd, the landlord denies your application because of a past criminal record.'}, //should be 3
        {title: 'Earn a Promotion', description: 'Get recognized for your hard work and receive a promotion. Increase your monthly salary by 5% before calculating your housing allowance'}, // 4
        {title: 'Student Loans', description: 'The avergae student loan debt in X was Y. Subtract a monthly payment of z from your monthly income '}, // 3
        {title: 'Pay Discrimination', description: 'African American women earn an average of 63 cents to the dollar that white males earn. Reduce your salary by 37% before calculating your housing allowance'}, //3
        {title: 'Support System', description: 'A strong support system of friends, family, and neighbors cancels out the effects of any mental health, chronic health, and transportation challenges. If you have children, reduce your childcare costs by half'}, // 6
        {title: 'Freelance Job', description: 'Pick up a small freelance job and add $100 to your monthly hjousing income before calculating you housing allowance'}, // 3
        {title: 'Chronic Health Issues', description: 'Unexpected medical expemnses can increase the risk of housing insecurity. Roll the die - if it\'s an odd number subtract $20 from your monthly housing income'}, //3
        {title: 'Physical Disability', description: 'Less than 4% of housing units in America are suitable for people with mobility challenges. After drawing a neighborhood card, roll the dice. If the number is odd, the unit is not accessible and you are not able to rent it'}, //3
        {title: 'Child Support', description: 'Fall behind on child support and have your wages garnished - subtract $200 from your monthly income'} // 3
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
        case UPDATE_PLAYER: //todo evalute if i need these anymore
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
        case FILL_JOBS:
            return Object.assign({}, state, {
                jobs: (action.payload.jobs)
            });
            break;
        case FILL_NEIGHBORHOODS:
            return Object.assign({}, state, {
                neighborhoods: (action.payload.neighborhoods)
            });
            break;
    }
    return state;
};

export default rootReducer;
