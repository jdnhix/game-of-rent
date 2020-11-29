export const UPDATE_CITY_AND_PLAYER_COUNT = 'UPDATE_CITY_AND_PLAYER_COUNT';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const REMOVE_JOB = 'REMOVE_CARD';
export const ADD_FAMILY = 'ADD_FAMILY'
export const FILL_JOBS = 'FILL_JOBS'
export const FILL_NEIGHBORHOODS = 'FILL_NEIGHBORHOODS'
export const FILL_CITIES = 'FILL_CITIES';
export const SET_PLAYER = 'SET_PLAYER';
export const UPDATE_PLAYER_AVATAR = 'UPDATE_PLAYER_AVATAR';
export const INIT_PLAYER = '';
export function setPlayer(payload) {
    return { type: SET_PLAYER, payload };
}

export function updatePlayerAvatar(payload) {
    return { type: UPDATE_PLAYER_AVATAR, payload };
}

export function initPlayer() {
    return { type: INIT_PLAYER };
}

// todo evaluate if i even need any of these anymore
export function updatePlayer(payload){
    return { type: UPDATE_PLAYER, payload }
}

export function updateCityAndCount(payload){
    return { type: UPDATE_CITY_AND_PLAYER_COUNT, payload }
}

export function removeJob(payload){
    return { type: REMOVE_JOB, payload }
}

export function addFamily(payload){
    return { type: ADD_FAMILY, payload }
}

export function fillJobs(payload){
    return{ type: FILL_JOBS, payload }
}

export function fillNeighborhoods(payload){
    return{ type: FILL_NEIGHBORHOODS, payload }
}

export function fillingCities(payload) {
    return { type: FILL_CITIES, payload}
}