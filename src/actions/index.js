
export const CREATE_NEWBOARD = 'CREATE_NEWBOARD';
export const CHECK_TREASURES = 'CHECK_TREASURES';

const filterAndGetResponse = (input, response) => {
    let result = {};
    let res = [];
    input.forEach(val => {
        for(const key in response.result[0]) {
            response.result[0][key].includes(val) ? res.push(key) : null;
        }
    })
    return result.res = res;
}

export const createdNewBoard = message => {
    return ({
        type: CREATE_NEWBOARD,
        message,
    });
};

export const checkTreasures = json => ({
    type: CHECK_TREASURES,
    treasure : json === undefined ? [] : json,
});

export const sendPlayerName = () => (dispatch) => {
    dispatch(createdNewBoard("player created"));
}

export const getResult = (input) => (dispatch) => {
    const url = "http://www.mocky.io/v2/5e650c86340000a600338954"
    
    return fetch(url)
    .then(response => response.json())
    .then(result => {
        dispatch(checkTreasures(filterAndGetResponse(input, result)));
    })  
     
}